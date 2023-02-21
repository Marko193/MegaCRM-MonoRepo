/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {globalPrefix} from './constants';
import {options} from './swagger/configurationFile';
import {ApiConfigService} from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);

  const config: ApiConfigService = app.get(ApiConfigService);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/${globalPrefix}/swagger`, app, document);

  const port = config.applicationPort || 3333;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${config.applicationHost}:${port}/${globalPrefix}`
  );
}

bootstrap();
