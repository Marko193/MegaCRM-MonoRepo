import {User} from './../entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import {CryptoService} from '../crypto/crypto.service';

import {DataSource, Repository} from 'typeorm';
import Access from './interface/access.interface';
import {HelperFunctions} from '../constants';
import {EmployeeDto} from '../employees/dto/employee.dto';
import {TypeToken} from '../enums';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {TokenService} from '../token/token.service';

@Injectable()
export class AuthService {
  private readonly employeeEntity: Repository<User>;

  constructor(
    private readonly cryptoService: CryptoService,
    private readonly tokenService: TokenService,

    private readonly helperFunctions: HelperFunctions,
    @Inject(CONNECTION) connection: DataSource
  ) {
    this.employeeEntity = connection.getRepository(User);
  }

  public async validateUser(user: User, password: string) {
    if (!user.is_account_active) {
      throw new UnauthorizedException('Account blocked');
    }

    await this.verifyPassword(user, password);
  }

  public async verifyPassword(user: User, password: string): Promise<void> {
    const checkPassword = await this.cryptoService.compareHash(
      password,
      user.password
    );
    if (!checkPassword) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async getAuthenticatedUser(corporate_email: string, password: string) {
    const user = await this.employeeEntity.findOne({
      where: {
        corporate_email: corporate_email,
      },
    });
    if (!user) {
      throw new HttpException(
        'Employee with this corporate_email does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    await this.validateUser(user, password);
    try {
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Company id does not correct',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async login(
    user: User,
    type?: string
  ): Promise<(Access & {user: EmployeeDto}) | Access> {
    const accessToken = await this.tokenService.getJwtToken(
      user,
      TypeToken.access
    );
    const refreshToken = await this.tokenService.getJwtToken(
      user,
      TypeToken.refresh
    );

    await this.tokenService.setCurrentTokenType(
      refreshToken,
      user,
      TypeToken.refresh,
      this.helperFunctions.expTime(),
      this.helperFunctions.currentDate()
    );

    user.last_login = this.helperFunctions.currentDate();

    await this.employeeEntity.save(user);
    return type === 'refresh'
      ? {
          accessToken,
          refreshToken,
        }
      : {
          accessToken,
          refreshToken,
          refreshTime: this.helperFunctions.expTime(),
          user,
        };
  }
}
