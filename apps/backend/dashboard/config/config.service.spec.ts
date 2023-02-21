import {ConfigService} from '@nestjs/config/dist/config.service';
import {Test} from '@nestjs/testing';
import {ApiConfigService} from './config.service';

jest.mock('@nestjs/config/dist/config.service');

describe('ConfigService', () => {
  const text = 'mock_text_for_testing';
  const num = 123;
  const bool = true;

  let apiConfigService: ApiConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [ApiConfigService, ConfigService],
    }).compile();

    apiConfigService = moduleRef.get<ApiConfigService>(ApiConfigService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should return database host value', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.dbHost).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('POSTGRES_HOST');
  });

  it('should return database port value', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.dbPort).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('POSTGRES_PORT');
  });

  it('should return database name', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.dbName).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('POSTGRES_DATABASE_NAME');
  });

  it('should return database user name', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.dbUser).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('POSTGRES_USER');
  });

  it('should return database access password', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.dbPassword).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('POSTGRES_DATABASE_PASSWORD');
  });

  it('should return the number of application port', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => num);

    expect(apiConfigService.applicationPort).toEqual(num);
    expect(configServiceGetSpyOn).toBeCalledWith('APPLICATION_PORT');
  });

  it('should return the current environment value', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.env).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('ENV');
  });

  it('should check if migrations are running', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => bool);

    expect(apiConfigService.runMigrations).toEqual(bool);
    expect(configServiceGetSpyOn).toBeCalledWith('RUN_MIGRATIONS');
  });

  it('should check if public access key exist', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.jwtPublicKeyAccess).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('JWT_PUBLIC_KEY_ACCESS');
  });

  it('should check if private access key exist', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.jwtPrivateKeyAccess).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('JWT_PRIVATE_KEY_ACCESS');
  });

  it('should check if public refresh key exist', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.jwtPublicKeyRefresh).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('JWT_PUBLIC_KEY_REFRESH');
  });

  it('should check if private refresh key exist', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.jwtPrivateKeyRefresh).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('JWT_PRIVATE_KEY_REFRESH');
  });

  it('should check jwt access token expired time', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.jwtAccessTokenExpTime).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
    );
  });

  it('should check jwt refresh token expired time', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.jwtRefreshTokenExpTime).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
    );
  });

  it('should check if database is synchronizing', () => {
    const configServiceGetSpyOn = jest
      .spyOn(configService, 'get')
      .mockImplementation(() => text);

    expect(apiConfigService.sync).toEqual(text);
    expect(configServiceGetSpyOn).toBeCalledWith('SYNCHRONIZE');
  });
});
