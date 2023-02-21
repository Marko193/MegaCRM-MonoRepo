import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {CryptoService} from '../crypto/crypto.service';
import {Token} from '../entities/tokens.entity';
import {User} from '../entities/user.entity';
import {NodemailerService} from '../nodemailer/nodemailer.service';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {AuthService} from '../auth/auth.service';
import {HelperFunctions} from '../constants';
import {TokenService} from '../token/token.service';
import {deleteFileName} from '../helpers/fileUpload';
import {TypeToken} from '../enums';
import {PageDto, PageOptionsDto} from '../pagination';

@Injectable()
export class EmployeesService {
  private readonly employeeEntity: Repository<User>;
  private readonly tokenEntity: Repository<Token>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly cryptoService: CryptoService,
    private readonly nodemailerService: NodemailerService,
    private readonly helperFunctions: HelperFunctions,
    private readonly initPageOptions: PageOptionsDto,
    private readonly tokenService: TokenService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    this.employeeEntity = connection.getRepository(User);
    this.tokenEntity = connection.getRepository(Token);
  }

  public async sendResetPasswordLetterToEmail(corporate_email: string) {
    const user = await this.employeeEntity.findOne({
      where: {
        corporate_email: corporate_email,
        is_account_active: true,
      },
    });
    if (!user) {
      throw new HttpException(
        'User with this corporate email does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    const restorePasswordKey = await this.cryptoService.generatePasswordKey();

    const encodedTokenValuesList =
      await this.cryptoService.restorePasswordTokenEncoder(restorePasswordKey);

    await this.tokenService.setCurrentTokenType(
      encodedTokenValuesList.encrypted,
      user,
      TypeToken.restore_password,
      this.helperFunctions.expTime(),
      this.helperFunctions.currentDate()
    );

    console.log('restore password key', encodedTokenValuesList.encoded);

    const htmlMessageBodyObj =
      await this.nodemailerService.createMessageBodyFromTemplate(
        {
          from: 'MegaDevLLC HR',
          to: corporate_email,
          subject: 'A letter with restore password link',
        },
        {
          template: 'restorePassword',
          data: {
            token: encodedTokenValuesList.encoded,
          },
        }
      );

    return this.nodemailerService.sendMessageToEmail(
      htmlMessageBodyObj,
      `Success! The letter with restore password link was sent to: ${htmlMessageBodyObj.to}`
    );
  }

  public async restorePassword(
    jwtRestorePasswordToken: string,
    password: string
  ) {
    const decryptedTokenValue =
      await this.cryptoService.restorePasswordTokenDecoder(
        jwtRestorePasswordToken
      );

    const tokenData = await this.tokenService.getTokenByHash(
      decryptedTokenValue
    );

    const isRestorePasswordTokenExpiredIn =
      this.helperFunctions.isDateInThePast(new Date(tokenData.expiratin_at));

    if (!tokenData || isRestorePasswordTokenExpiredIn) {
      return new HttpException(
        'Restore password token invalid, not exist or expired',
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await this.findEmployeeByIdHelper(tokenData.user_id);

    user.password = await this.cryptoService.hash(password);
    await this.employeeEntity.save(user);
    await this.tokenService.removeTokenHelper(tokenData.user_id);

    const htmlMessageBodyObj =
      await this.nodemailerService.createMessageBodyFromTemplate(
        {
          from: 'MegaDevLLC HR',
          to: user.corporate_email,
          subject: 'New password',
        },
        {
          template: 'confirmRestorePassword',
          data: {
            password,
          },
        }
      );

    return this.nodemailerService.sendMessageToEmail(
      htmlMessageBodyObj,
      `The password was successfully restored. The letter with new one was sent to: ${htmlMessageBodyObj.to}`
    );
  }

  public async getEmployeesList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<User>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const employees = await this.employeeEntity.find({
        relations: [
          'role_info',
          'family_members',
          'user_languages.language_level_info',
          'user_languages.language_name_id',
          'user_skills.skill_info',
          'user_position.position_info',
          'user_calendar_requests',
          'user_warehouse_items.warehouse_item_id',
          'user_warehouse_requests',
          'meeting_requests',
        ],
        order: {['created_at']: actualPageOptions.order},
        skip: this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        ),
        take: actualPageOptions.limit,
      });

      const dataPaginated =
        await this.helperFunctions.createSelectPaginateDataHelper(
          actualPageOptions,
          await this.employeeEntity.find({}),
          employees
        );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getEmployeesOnProbationPeriod(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<User>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const employeesOnProbationPeriod = await this.employeeEntity.find({
        relations: [
          'role_info',
          'family_members',
          'user_languages.language_level_info',
          'user_languages.language_name_id',
          'user_skills.skill_info',
          'user_position.position_info',
          'user_calendar_requests',
          'user_warehouse_items.warehouse_item_id',
          'user_warehouse_requests',
          'meeting_requests',
        ],
        where: {
          is_probation_period: true,
          is_account_active: true,
        },
        order: {['created_at']: actualPageOptions.order},
        skip: this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        ),
        take: actualPageOptions.limit,
      });

      const dataPaginated =
        await this.helperFunctions.createSelectPaginateDataHelper(
          actualPageOptions,
          await this.employeeEntity.find({
            where: {
              is_probation_period: true,
              is_account_active: true,
            },
          }),
          employeesOnProbationPeriod
        );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async addEmployee(employee, avatar): Promise<User> {
    try {
      const generatedPassword = await this.cryptoService.generatePasswordKey();

      const addedEmployee = await this.employeeEntity.save({
        ...employee,
        avatar: avatar === null || undefined ? null : avatar?.filename,
        inn: await this.cryptoService.encryptText(employee.inn),
        password: await this.cryptoService.hash(generatedPassword),
      });

      const htmlMessageBodyObj =
        await this.nodemailerService.createMessageBodyFromTemplate(
          {
            from: 'MegaDevLLC HR',
            to: addedEmployee.corporate_email,
            subject:
              'Congratulations! Here is you corporate email and password to sign in.',
          },
          {
            template: 'singUp',
            data: {
              email: addedEmployee.corporate_email,
              password: generatedPassword,
              companyDomain: 'megadevllc.com',
            },
          }
        );

      await this.nodemailerService.sendMessageToEmail(
        htmlMessageBodyObj,
        `employee.successfully.added`
      );

      return await this.findEmployeeByIdHelper(addedEmployee.id);
    } catch (err) {
      console.log('err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateEmployee(initEmployee, avatar): Promise<User> {
    const updatedEmployee = await this.employeeEntity.preload(initEmployee);
    if (!updatedEmployee) {
      throw new HttpException(
        'User with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    if (avatar !== null || undefined) {
      await deleteFileName(updatedEmployee.avatar);
    }

    try {
      await this.employeeEntity.save({
        ...updatedEmployee,
        inn:
          initEmployee.inn === null || undefined
            ? updatedEmployee.inn
            : await this.cryptoService.encryptText(initEmployee.inn),
        avatar:
          avatar === null || undefined
            ? updatedEmployee.avatar
            : avatar?.filename,
      });
      return await this.findEmployeeByIdHelper(updatedEmployee.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeEmployee(id: number) {
    const userForDeleting = await this.findEmployeeByIdHelper(id);

    if (!userForDeleting) {
      throw new HttpException(
        'User with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      const users = await this.employeeEntity.find({});

      users.map(async (user) => {
        if (user.assigned_hr_id === userForDeleting.id) {
          user.assigned_hr_id = null;
          await this.employeeEntity.save(user);
        } else if (user.assigned_pm_id === userForDeleting.id) {
          user.assigned_pm_id = null;
          await this.employeeEntity.save(user);
        } else if (user.assigned_sales_id === userForDeleting.id) {
          user.assigned_sales_id = null;
          await this.employeeEntity.save(user);
        }
      });

      if (userForDeleting.avatar !== null) {
        await deleteFileName(userForDeleting.avatar);
      }

      await this.tokenService.removeTokenHelper(id);
      await this.employeeEntity.delete(id);

      return {
        success: true,
        message: `The employee with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: number
  ): Promise<User> {
    try {
      const userToken = await this.tokenEntity.findOne({
        where: {
          user_id: id,
        },
      });

      const isRefreshTokenMatching = await this.cryptoService.compareHash(
        refreshToken.slice(137),
        userToken.token
      );

      if (isRefreshTokenMatching) {
        return await this.findEmployeeByIdHelper(id);
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async getUsersListByRole(
    initPageOptions: PageOptionsDto,
    role_id: number
  ): Promise<PageDto<User>> {
    const actualPageOptions =
      this.initPageOptions.checkQueryParamsFunction(initPageOptions);

    const roleUsersList = await this.employeeEntity.find({
      relations: ['role_info'],
      where: {
        role_id: role_id,
      },
      order: {['created_at']: actualPageOptions.order},
      skip: this.initPageOptions.skip(
        actualPageOptions.page,
        actualPageOptions.limit
      ),
      take: actualPageOptions.limit,
    });

    const dataPaginated =
      await this.helperFunctions.createSelectPaginateDataHelper(
        actualPageOptions,
        await this.employeeEntity.find({
          where: {
            role_id: role_id,
          },
        }),
        roleUsersList
      );
    return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
  }

  public async updateCalendarBalanceDaysList(calendarBalanceDaysList) {
    const employee = await this.findEmployeeByIdHelper(
      calendarBalanceDaysList.id
    );
    for (const [key, value] of Object.entries(calendarBalanceDaysList)) {
      employee[key] = value;
    }
    await this.employeeEntity.save(employee);
    return employee;
  }

  public async changeProfilePassword(user: User, changeProfilePasswordBody) {
    await this.authService.verifyPassword(
      user,
      changeProfilePasswordBody.old_password
    );

    user.password = await this.cryptoService.hash(
      changeProfilePasswordBody.new_password
    );
    await this.employeeEntity.save(user);

    const htmlMessageBodyObj =
      await this.nodemailerService.createMessageBodyFromTemplate(
        {
          from: 'MegaDevLLC HR',
          to: user.corporate_email,
          subject: 'New password',
        },
        {
          template: 'confirmRestorePassword',
          data: {
            password: changeProfilePasswordBody.new_password,
          },
        }
      );

    return this.nodemailerService.sendMessageToEmail(
      htmlMessageBodyObj,
      `The letter with your new password was sent to: ${htmlMessageBodyObj.to}`
    );
  }

  public async findEmployeeById(id: number): Promise<User> {
    const employee = await this.findEmployeeByIdHelper(id);
    return {
      ...employee,
      inn: await this.cryptoService.decryptText(employee.inn),
    };
  }

  public async findEmployeeByIdHelper(id: number): Promise<User> {
    const user = await this.employeeEntity.findOne({
      relations: [
        'role_info',
        'family_members',
        'user_languages.language_level_info',
        'user_languages.language_name_id',
        'user_skills.skill_info',
        'user_position.position_info',
        'user_calendar_requests',
        'user_warehouse_items.warehouse_item_id',
        'user_warehouse_requests',
        'meeting_requests',
      ],
      where: {
        id: id,
        is_account_active: true,
      },
    });
    if (!user) {
      throw new HttpException(
        'Employee with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  public async getRawEmployeeListHelper(): Promise<User[]> {
    return await this.employeeEntity.find({
      relations: [
        'role_info',
        'family_members',
        'user_languages.language_level_info',
        'user_languages.language_name_id',
        'user_skills.skill_info',
        'user_position.position_info',
        'user_calendar_requests',
        'user_warehouse_items.warehouse_item_id',
        'user_warehouse_requests',
        'meeting_requests',
      ],
    });
  }

  public async findRawEmployeeById(id: number): Promise<User> {
    const user = await this.employeeEntity.findOne({
      where: {
        id: id,
        is_account_active: true,
      },
    });
    if (!user) {
      throw new HttpException(
        'Employee with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  public async testRbacSystemSuperAdmin() {
    return {
      success: true,
      message: 'rbac-system API (super admin access only) worked successfully',
    };
  }
}
