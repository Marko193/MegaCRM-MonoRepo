import {DocumentBuilder} from '@nestjs/swagger';
import {swaggerDescription, swaggerTitle, swaggerVersion} from './apiTags';

export const options = new DocumentBuilder()
  .setTitle(swaggerTitle)
  .setDescription(swaggerDescription)
  .setVersion(swaggerVersion)
  .addBearerAuth()
  .build();
