import {Module} from '@nestjs/common';
import {CalendarRequestsController} from './calendar-requests.controller';
import {CalendarRequestsService} from './calendar-requests.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {EmployeesModule} from '../employees/employees.module';
import {HelperFunctions} from '../constants';
import {ApiConfigModule} from '../config/config.module';
import {PositionsService} from '../positions/positions.service';
import {PageOptionsDto} from '../pagination';

@Module({
  imports: [
    ApiConfigModule,
    EmployeesModule,
    TypeOrmModule.forFeature([CalendarRequestEntity]),
  ],
  controllers: [CalendarRequestsController],
  providers: [
    CalendarRequestsService,
    PositionsService,
    HelperFunctions,
    PageOptionsDto,
  ],
  exports: [
    CalendarRequestsService,
    PositionsService,
    HelperFunctions,
    PageOptionsDto,
  ],
})
export class CalendarRequestsModule {}
