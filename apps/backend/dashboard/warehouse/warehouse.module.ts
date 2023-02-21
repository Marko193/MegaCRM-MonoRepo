import {Module} from '@nestjs/common';
import {WarehouseController} from './warehouse.controller';
import {WarehouseService} from './warehouse.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {ApiConfigModule} from '../config/config.module';
import {HelperFunctions} from '../constants';
import {PageOptionsDto} from '../pagination';

@Module({
  imports: [ApiConfigModule, TypeOrmModule.forFeature([WarehouseItemEntity])],
  controllers: [WarehouseController],
  providers: [WarehouseService, HelperFunctions, PageOptionsDto],
  exports: [WarehouseService, HelperFunctions, PageOptionsDto],
})
export class WarehouseModule {}
