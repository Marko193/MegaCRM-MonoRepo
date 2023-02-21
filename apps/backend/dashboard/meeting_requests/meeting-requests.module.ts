import {Module} from '@nestjs/common';
import {MeetingRequestsController} from './meeting-requests.controller';
import {MeetingRequestsService} from './meeting-requests.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {EmployeesModule} from '../employees/employees.module';
import {HelperFunctions} from '../constants';
import {ApiConfigModule} from '../config/config.module';
import {PositionsService} from '../positions/positions.service';
import {UserMeetingsRequestsItemsEntity} from '../entities/user-meetings-requests.entity';
import {PageOptionsDto} from '../pagination';

@Module({
  imports: [
    ApiConfigModule,
    EmployeesModule,
    TypeOrmModule.forFeature([
      CalendarRequestEntity,
      UserMeetingsRequestsItemsEntity,
    ]),
  ],
  controllers: [MeetingRequestsController],
  providers: [
    MeetingRequestsService,
    PositionsService,
    HelperFunctions,
    PageOptionsDto,
  ],
  exports: [
    MeetingRequestsService,
    PositionsService,
    HelperFunctions,
    PageOptionsDto,
  ],
})
export class MeetingRequestsModule {}
