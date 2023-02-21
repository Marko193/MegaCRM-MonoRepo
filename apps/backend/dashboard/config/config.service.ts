import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';
import {IsString, IsNotEmpty, IsNumber, IsEnum} from '@nestjs/class-validator';
import {Env} from './envs';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DATABASE_NAME: string;

  @IsNumber()
  @IsNotEmpty()
  APPLICATION_PORT: number;

  @IsEnum(Env)
  ENV: string;

  @IsString()
  @IsNotEmpty()
  RUN_MIGRATIONS: string;

  @IsString()
  @IsNotEmpty()
  JWT_PUBLIC_KEY_ACCESS: string;

  @IsString()
  @IsNotEmpty()
  JWT_PRIVATE_KEY_ACCESS: string;

  @IsString()
  @IsNotEmpty()
  JWT_PUBLIC_KEY_REFRESH: string;

  @IsString()
  @IsNotEmpty()
  JWT_PRIVATE_KEY_REFRESH: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;

  @IsNumber()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

  @IsNumber()
  @IsNotEmpty()
  SYNCHRONIZE: number;

  @IsString()
  @IsNotEmpty()
  SMTP_TRANSPORT_SERVICE: string;

  @IsString()
  @IsNotEmpty()
  SMTP_TRANSPORT_HOST: string;

  @IsString()
  @IsNotEmpty()
  SMTP_TRANSPORT_AUTH_USER: string;

  @IsString()
  @IsNotEmpty()
  SMTP_TRANSPORT_AUTH_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  TEMPLATES_PATH: string;

  @IsString()
  @IsNotEmpty()
  SECRET_ENCODE_KEY: string;
}

@Injectable()
export class ApiConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  get applicationHost(): string {
    return this.configService.get('HOST');
  }

  get dbHost(): string {
    return this.configService.get('POSTGRES_HOST');
  }

  get dbPort(): number {
    return this.configService.get('POSTGRES_PORT');
  }

  get dbName(): string {
    return this.configService.get('POSTGRES_DATABASE_NAME');
  }

  get dbUser(): string {
    return this.configService.get('POSTGRES_USER');
  }

  get dbPassword(): string {
    return this.configService.get('POSTGRES_DATABASE_PASSWORD');
  }

  get applicationPort(): number {
    return this.configService.get('APPLICATION_PORT');
  }

  get env(): string {
    return this.configService.get('ENV');
  }

  get runMigrations(): boolean {
    return this.configService.get('RUN_MIGRATIONS');
  }

  get jwtPublicKeyAccess(): string {
    return this.configService
      .get('JWT_PUBLIC_KEY_ACCESS')
      .replace(/\\n/gm, '\n');
  }

  get jwtPrivateKeyAccess(): string {
    return this.configService
      .get('JWT_PRIVATE_KEY_ACCESS')
      .replace(/\\n/gm, '\n');
  }

  get jwtPublicKeyRefresh(): string {
    return this.configService
      .get('JWT_PUBLIC_KEY_REFRESH')
      .replace(/\\n/gm, '\n');
  }

  get jwtPrivateKeyRefresh(): string {
    return this.configService
      .get('JWT_PRIVATE_KEY_REFRESH')
      .replace(/\\n/gm, '\n');
  }

  get jwtAccessTokenExpTime(): string {
    return this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
  }

  get jwtRefreshTokenExpTime(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  get sync(): string {
    return this.configService.get('SYNCHRONIZE');
  }

  get smtpTransportService(): string {
    return this.configService.get('SMTP_TRANSPORT_SERVICE');
  }

  get smtpTransportHost(): string {
    return this.configService.get('SMTP_TRANSPORT_HOST');
  }

  get smtpTransportAuthUser(): string {
    return this.configService.get('SMTP_TRANSPORT_AUTH_USER');
  }

  get smtpTransportAuthPassword(): string {
    return this.configService.get('SMTP_TRANSPORT_AUTH_PASSWORD');
  }

  get templatesPath(): string {
    return this.configService.get('TEMPLATES_PATH');
  }

  get secretEncodeKey(): string {
    return this.configService.get('SECRET_ENCODE_KEY');
  }
}
