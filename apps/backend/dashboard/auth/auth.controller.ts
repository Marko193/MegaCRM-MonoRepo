import {LoginEmployeeDto} from '../employees/dto/login-employee.dto';
import {
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {User} from '../entities/user.entity';
import {AuthService} from './auth.service';
import JwtAuthenticationGuard from './guards/auth.guard';
import LocalAuthenticationGuard from './guards/local-auth.guard';
import JwtRefreshGuard from './guards/refresh.guard';
import {UserDecorator} from './user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {TokenService} from '../token/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiOperation({summary: 'Login into the system'})
  @ApiBody({
    description: 'Required fields for auth',
    type: LoginEmployeeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User object',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async logIn(@UserDecorator() user: User) {
    const access = await this.authService.login(user);
    if (!access) {
      throw new UnauthorizedException();
    }
    return access;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({summary: 'Refresh token'})
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '{status: true}',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async refresh(@UserDecorator() user: User) {
    return await this.authService.login(user, 'refresh');
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @ApiOperation({summary: 'Logout from the system'})
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '"success": true',
  })
  public async logOut(@UserDecorator() user: User) {
    await this.tokenService.removeTokenHelper(user.id);
    return {success: true};
  }
}
