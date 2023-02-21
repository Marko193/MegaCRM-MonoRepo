import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {swaggerDefaultAPITag} from '../swagger/apiTags';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @ApiTags(swaggerDefaultAPITag)
  @Get()
  getData() {
    return this.appService.getData();
  }
}
