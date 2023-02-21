import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import {EmployeesService} from './employees.service';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {RoleGuard} from '../auth/guards/role.guard';
import {RolesDecorator} from '../decorators/roles.decorator';
import {EmployeeDto} from './dto/employee.dto';
import {ApiBody, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {User} from '../entities/user.entity';
import {RestorePasswordProfileDto} from './dto/restore-password-profile.dto';
import {UserDecorator} from '../auth/user.decorator';
import {CorporateEmailDto, RestorePasswordDto} from '../auth/dto/auth.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {editFileName, imageFileFilter} from '../helpers/fileUpload';
import {PageDto, PageOptionsDto} from '../pagination';

@UseGuards(RoleGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get full employees list',
  })
  @ApiResponse({
    status: 200,
    description: 'An array of such users object',
    type: [User],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  public async getEmployeesList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<User>> {
    return this.employeesService.getEmployeesList(pageOptionsDto);
  }

  @Get('on-probation-period')
  @ApiOperation({summary: 'Get employees with probation period (or not)'})
  @ApiResponse({
    status: 200,
    description: 'Employees on probation / nonProbation period array',
    type: [User],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  public async getEmployeesOnProbationPeriod(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<User>> {
    return this.employeesService.getEmployeesOnProbationPeriod(pageOptionsDto);
  }

  @Post('add')
  @ApiOperation({summary: 'Add new employee'})
  @ApiBody({
    description: 'Use all of this fields to add new employee',
    type: EmployeeDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The employee with successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async addEmployee(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() req
  ) {
    return this.employeesService.addEmployee(
      JSON.parse(req.newEmployee),
      avatar
    );
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update employee by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: EmployeeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async updateEmployee(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() req
  ) {
    return this.employeesService.updateEmployee(
      JSON.parse(req.updatedEmployee),
      avatar
    );
  }

  @Patch('update-balance-days-list')
  @ApiOperation({
    summary: 'Update employee calendar days balance  list',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: EmployeeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'user object with updated balance days',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  public async updateCalendarBalanceDaysList(
    @Body() calendarBalanceDaysList: EmployeeDto
  ) {
    return this.employeesService.updateCalendarBalanceDaysList(
      calendarBalanceDaysList
    );
  }

  @Patch('change-profile-password')
  @ApiOperation({
    summary: 'Update employee password from employee profile',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: EmployeeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User with updated password',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  public async changeProfilePassword(
    @UserDecorator() user: User,
    @Body() restorePasswordProfileDto: RestorePasswordProfileDto
  ) {
    return this.employeesService.changeProfilePassword(
      user,
      restorePasswordProfileDto
    );
  }

  @Post('send-reset-password-letter')
  @ApiOperation({
    summary:
      'Send message with restore password link to user`s corporate email',
  })
  @ApiBody({
    description: 'Corporate email is required.',
    type: CorporateEmailDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'The restore password link was successfully sent to: "user.corporate_email"',
  })
  @ApiResponse({
    status: 500,
    description: 'Error! The letter wasn`t sent.',
  })
  public async sendResetPasswordLetterToEmail(
    @Body() companyDto: CorporateEmailDto
  ) {
    return this.employeesService.sendResetPasswordLetterToEmail(
      companyDto.corporate_email
    );
  }

  @Patch('restore-password')
  @ApiOperation({
    summary: 'Restore old password and set the new one',
  })
  @ApiResponse({
    status: 200,
    description:
      'The password was successfully restored. The letter with new one was sent to: "user.corporate_email"',
  })
  @ApiResponse({
    status: 400,
    description: 'Password reset token time expired.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error! The password was not restored.',
  })
  public async restorePassword(@Body() restorePasswordDto: RestorePasswordDto) {
    return this.employeesService.restorePassword(
      restorePasswordDto.jwtRestorePasswordToken,
      restorePasswordDto.password
    );
  }

  @ApiOperation({summary: 'Remove employee from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'The employee with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  @Delete('remove/:id')
  public async removeEmployee(@Param('id') id: string) {
    return this.employeesService.removeEmployee(+id);
  }

  @Post('test-rbac-system-superadmin')
  @RolesDecorator('admin', 'superadmin')
  testRbacSystemSuperAdmin() {
    return this.employeesService.testRbacSystemSuperAdmin();
  }

  @Get('/user-role/:role_id')
  @ApiOperation({
    summary: 'Get full list of user with specific role by role_id',
  })
  @ApiResponse({
    status: 200,
    description: 'Users array of objects with specific roles',
    type: [User],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  public async getUsersListByRole(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('role_id') role_id: number
  ): Promise<PageDto<User>> {
    return this.employeesService.getUsersListByRole(pageOptionsDto, role_id);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get employee by ID'})
  @ApiResponse({
    status: 200,
    description: 'User object',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthenticationGuard)
  public async getEmployee(@Param('id') id: string) {
    return this.employeesService.findEmployeeById(+id);
  }
}
