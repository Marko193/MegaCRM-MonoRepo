import {Module} from '@nestjs/common';
import {WarehouseRequestsController} from './warehouse-requests.controller';
import {WarehouseRequestsService} from './warehouse-requests.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeesModule} from '../employees/employees.module';
import {HelperFunctions} from '../constants';
import {ApiConfigModule} from '../config/config.module';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {WarehouseRequestEntity} from '../entities/warehouse-request.entity';
import {UserWarehouseItemsEntity} from '../entities/user-warehouse-items.entity';
import {WarehouseService} from '../warehouse/warehouse.service';
import {PositionsService} from '../positions/positions.service';
import {PageOptionsDto} from '../pagination';

@Module({
  imports: [
    ApiConfigModule,
    EmployeesModule,
    TypeOrmModule.forFeature([
      WarehouseItemEntity,
      WarehouseRequestEntity,
      UserWarehouseItemsEntity,
    ]),
  ],
  controllers: [WarehouseRequestsController],
  providers: [
    WarehouseRequestsService,
    WarehouseService,
    PositionsService,
    HelperFunctions,
    PageOptionsDto,
  ],
  exports: [
    WarehouseRequestsService,
    WarehouseService,
    PositionsService,
    HelperFunctions,
    PageOptionsDto,
  ],
})
export class WarehouseRequestsModule {}
