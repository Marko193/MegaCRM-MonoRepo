import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {CalendarRequestItemDto} from './dto/calendar-request-item.dto';
import {EmployeesService} from '../employees/employees.service';
import {CalendarRequestStatuses, CalendarRequestTypes} from '../enums';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {HelperFunctions} from '../constants';
import {User} from '../entities/user.entity';
import {PositionsEntity} from '../entities/positions.entity';
import {PositionsService} from '../positions/positions.service';
import {PageDto, PageOptionsDto} from '../pagination';

@Injectable()
export class CalendarRequestsService {
  private readonly calendarRequestsEntity: Repository<CalendarRequestEntity>;
  private readonly employeeEntity: Repository<User>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly employeesService: EmployeesService,
    private readonly helperFunctions: HelperFunctions,
    private readonly positionsService: PositionsService,
    private readonly initPageOptions: PageOptionsDto
  ) {
    this.calendarRequestsEntity = connection.getRepository(
      CalendarRequestEntity
    );
    this.employeeEntity = connection.getRepository(User);
  }

  public async getCalendarRequestsList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<CalendarRequestEntity>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const dataPaginated = await this.getRawCalendarRequestsListQueryHelper(
        actualPageOptions
      );

      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      console.log('get err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCalendarReqYearsFilteringList() {
    const users = await this.employeesService.getRawEmployeeListHelper();
    return this.helperFunctions.getYearsTimestampsRequestsList(
      users,
      'calendarRequests'
    );
  }

  public async addCalendarRequest(
    calendarRequestBody: CalendarRequestItemDto
  ): Promise<CalendarRequestEntity> {
    if (
      !Object.values(CalendarRequestTypes).includes(calendarRequestBody.type)
    ) {
      throw new HttpException(
        `Such request parameter does not exist!`,
        HttpStatus.NOT_FOUND
      );
    }

    const employee = await this.employeesService.findEmployeeByIdHelper(
      calendarRequestBody.user_id
    );

    const askedDaysNumber = this.helperFunctions.calculateDaysNumber(
      calendarRequestBody.end_date,
      calendarRequestBody.start_date
    );

    if (askedDaysNumber < 0.5) {
      throw new HttpException(
        `The calendar response should be at least half a day (12 hours)!`,
        HttpStatus.FORBIDDEN
      );
    }

    const checkIfDaysNumberIsExceeded = (() => {
      switch (calendarRequestBody.type) {
        case 'vacation':
          return {
            daysBalance: employee.vacation_days_balance,
            requestType: calendarRequestBody.type,
            isAskedDaysNumberExceeded:
              employee.vacation_days_balance < askedDaysNumber,
          };
        case 'sickness':
          return {
            daysBalance: employee.sickness_days_balance,
            requestType: calendarRequestBody.type,
            isAskedDaysNumberExceeded:
              employee.sickness_days_balance < askedDaysNumber,
          };
        case 'dayoff':
          return {
            daysBalance: employee.day_off_days_balance,
            requestType: calendarRequestBody.type,
            isAskedDaysNumberExceeded:
              employee.day_off_days_balance < askedDaysNumber,
          };
        case 'homeoffice':
          return {
            daysBalance: employee.home_office_days_balance,
            requestType: calendarRequestBody.type,
            isAskedDaysNumberExceeded:
              employee.home_office_days_balance < askedDaysNumber,
          };
        case 'parental':
          return {
            daysBalance: employee.parental_days_balance,
            requestType: calendarRequestBody.type,
            isAskedDaysNumberExceeded:
              employee.parental_days_balance < askedDaysNumber,
          };
        case 'business':
          return {
            daysBalance: employee.business_days_balance,
            requestType: calendarRequestBody.type,
            isAskedDaysNumberExceeded:
              employee.business_days_balance < askedDaysNumber,
          };
      }
    })();

    if (checkIfDaysNumberIsExceeded.isAskedDaysNumberExceeded) {
      throw new HttpException(
        `The limit of asking days for request type "${checkIfDaysNumberIsExceeded.requestType}" is exceeded. Available only ${checkIfDaysNumberIsExceeded.daysBalance} days from ${askedDaysNumber} asking.`,
        HttpStatus.FORBIDDEN
      );
    }

    employee.user_calendar_requests.forEach((request) => {
      const isStartDateExists = this.helperFunctions.isDateBetweenTimestamps(
        calendarRequestBody.start_date,
        request.start_date,
        request.end_date
      );
      const isEndDateExists = this.helperFunctions.isDateBetweenTimestamps(
        calendarRequestBody.end_date,
        request.start_date,
        request.end_date
      );
      if (isStartDateExists || isEndDateExists === true) {
        throw new HttpException(
          `The calendar request on this timestamp is already exist!`,
          HttpStatus.FORBIDDEN
        );
      }
    });

    try {
      const assignedHr = await this.employeesService.findEmployeeByIdHelper(
        employee.assigned_hr_id
      );

      const rawEmployee = await this.employeesService.findRawEmployeeById(
        employee.id
      );

      const userPositionInfo: PositionsEntity =
        await this.positionsService.getPositionItemById(
          rawEmployee.user_position.position_info
        );

      const addedCalendarRequest = await this.calendarRequestsEntity.save({
        ...calendarRequestBody,
        user_name: employee.name,
        user_surname: employee.surname,
        user_position: userPositionInfo.position_name,
        reviewer_id: assignedHr.id,
        reviewer_name: assignedHr.name,
        reviewer_surname: assignedHr.surname,
        reviewer_position: assignedHr.role_info.role,
      });
      return await this.getCalendarRequestById(addedCalendarRequest.id);
    } catch (err) {
      console.log('add cal_req err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateCalendarRequest(
    calendarRequestBody
  ): Promise<CalendarRequestEntity> {
    const updatedCalendarRequest = await this.calendarRequestsEntity.preload(
      calendarRequestBody
    );
    if (!updatedCalendarRequest) {
      throw new HttpException(
        'Calendar request with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.calendarRequestsEntity.save(updatedCalendarRequest);
      return await this.getCalendarRequestById(updatedCalendarRequest.id);
    } catch (err) {
      console.log('update cal_req err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async handleCalendarRequest(
    handleCalendarRequestBody
  ): Promise<CalendarRequestEntity> {
    const calendarRequest = await this.getCalendarRequestById(
      handleCalendarRequestBody.id
    );

    calendarRequest.status = handleCalendarRequestBody.status;
    await this.calendarRequestsEntity.save(calendarRequest);

    if (handleCalendarRequestBody.status === 'approved') {
      const user = await this.employeesService.findEmployeeByIdHelper(
        calendarRequest.user_id
      );

      const askedDaysNumber = this.helperFunctions.calculateDaysNumber(
        calendarRequest.end_date,
        calendarRequest.start_date
      );

      const updatedUser = (() => {
        switch (calendarRequest.type) {
          case 'vacation':
            user.vacation_days_balance -= askedDaysNumber;
            return user;
          case 'sickness':
            user.sickness_days_balance -= askedDaysNumber;
            return user;
          case 'dayoff':
            user.day_off_days_balance -= askedDaysNumber;
            return user;
          case 'homeoffice':
            user.home_office_days_balance -= askedDaysNumber;
            return user;
          case 'parental':
            user.parental_days_balance -= askedDaysNumber;
            return user;
          case 'business':
            user.business_days_balance -= askedDaysNumber;
            return user;
        }
      })();

      await this.employeeEntity.save(updatedUser);
    }
    return await this.getCalendarRequestById(handleCalendarRequestBody.id);
  }

  public async cancelCalendarRequest(id: number) {
    const calendarRequest = await this.getCalendarRequestById(id);

    if (calendarRequest.status === 'processing') {
      throw new HttpException(
        'You can`t cancel processing request!',
        HttpStatus.NOT_FOUND
      );
    }

    if (calendarRequest.status === 'approved') {
      const user = await this.employeesService.findEmployeeByIdHelper(
        calendarRequest.user_id
      );

      const askedDaysNumber = this.helperFunctions.calculateDaysNumber(
        calendarRequest.end_date,
        calendarRequest.start_date
      );

      const updatedUser = (() => {
        switch (calendarRequest.type) {
          case 'vacation':
            user.vacation_days_balance += askedDaysNumber;
            return user;
          case 'sickness':
            user.sickness_days_balance += askedDaysNumber;
            return user;
          case 'dayoff':
            user.day_off_days_balance += askedDaysNumber;
            return user;
          case 'homeoffice':
            user.home_office_days_balance += askedDaysNumber;
            return user;
          case 'parental':
            user.parental_days_balance += askedDaysNumber;
            return user;
          case 'business':
            user.business_days_balance += askedDaysNumber;
            return user;
        }
      })();

      await this.employeeEntity.save(updatedUser);
    }

    await this.removeCalendarRequest(calendarRequest.id);

    return {
      success: true,
      message: `The calendar request with id ${id} was successfully cancelled!`,
    };
  }

  public async removeCalendarRequest(id: number) {
    const calendarRequest = await this.getCalendarRequestById(id);

    if (!calendarRequest) {
      throw new HttpException(
        'CalendarRequest with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.calendarRequestsEntity.delete(id);
      return {
        success: true,
        message: `The calendarRequest with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCalendarRequestById(
    user_id: number
  ): Promise<CalendarRequestEntity> {
    const calendarRequestItem = await this.calendarRequestsEntity.findOne({
      where: {
        id: user_id,
      },
    });
    if (!calendarRequestItem) {
      throw new NotFoundException();
    }
    try {
      return calendarRequestItem;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCalendarRequestsListByType(
    initPageOptions: PageOptionsDto,
    request_type
  ): Promise<PageDto<CalendarRequestEntity>> {
    if (!Object.values(CalendarRequestTypes).includes(request_type)) {
      throw new HttpException(
        `Such request parameter does not exist!`,
        HttpStatus.NOT_FOUND
      );
    }

    const actualPageOptions =
      this.initPageOptions.checkQueryParamsFunction(initPageOptions);

    const dataPaginated = await this.getReqListByTypeQueryHelper(
      actualPageOptions,
      request_type
    );
    return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
  }

  public async getCalendarRequestsListByStatus(
    initPageOptions: PageOptionsDto,
    status
  ): Promise<PageDto<CalendarRequestEntity>> {
    if (!Object.values(CalendarRequestStatuses).includes(status)) {
      throw new HttpException(
        `Such status parameter does not exist!`,
        HttpStatus.NOT_FOUND
      );
    }

    const actualPageOptions =
      this.initPageOptions.checkQueryParamsFunction(initPageOptions);

    const dataPaginated = await this.getReqListByStatusQueryHelper(
      actualPageOptions,
      status
    );

    const employees = await this.employeeEntity.find({});

    const calendarBalanceDaysWithStatusesList = [];
    dataPaginated.entities.map((requestItem) => {
      employees.find((employee) => {
        if (employee.id === requestItem.user_id) {
          const updatedCalendarReqItem = (() => {
            switch (requestItem.type) {
              case 'vacation':
                return {
                  ...requestItem,
                  avatar: employee.avatar,
                  daysBalance: employee.vacation_days_balance,
                  requestType: requestItem.type,
                };
              case 'sickness':
                return {
                  ...requestItem,
                  avatar: employee.avatar,
                  daysBalance: employee.sickness_days_balance,
                  requestType: requestItem.type,
                };
              case 'dayoff':
                return {
                  ...requestItem,
                  avatar: employee.avatar,
                  daysBalance: employee.day_off_days_balance,
                  requestType: requestItem.type,
                };
              case 'homeoffice':
                return {
                  ...requestItem,
                  avatar: employee.avatar,
                  daysBalance: employee.home_office_days_balance,
                  requestType: requestItem.type,
                };
              case 'parental':
                return {
                  ...requestItem,
                  avatar: employee.avatar,
                  daysBalance: employee.parental_days_balance,
                  requestType: requestItem.type,
                };
              case 'business':
                return {
                  ...requestItem,
                  avatar: employee.avatar,
                  daysBalance: employee.business_days_balance,
                  requestType: requestItem.type,
                };
            }
          })();
          calendarBalanceDaysWithStatusesList.push(updatedCalendarReqItem);
        }
      });
    });

    return new PageDto(
      calendarBalanceDaysWithStatusesList,
      dataPaginated.pageMetaDto
    );
  }

  public async getCalendarRequestsByUserId(
    initPageOptions: PageOptionsDto,
    user_id: number
  ): Promise<PageDto<CalendarRequestEntity>> {
    const actualPageOptions =
      this.initPageOptions.checkQueryParamsFunction(initPageOptions);

    const dataPaginated = await this.getReqListByUserIdQueryHelper(
      actualPageOptions,
      user_id
    );
    return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
  }

  public async getRawCalendarRequestsListQueryHelper(actualPageOptions) {
    const queryBuilder = await this.calendarRequestsEntity
      .createQueryBuilder('calendar_request')
      .orderBy('calendar_request.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }

  public async getReqListByTypeQueryHelper(actualPageOptions, request_type) {
    const queryBuilder = await this.calendarRequestsEntity
      .createQueryBuilder('calendar_request')
      .where({type: request_type})
      .orderBy('calendar_request.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }

  public async getReqListByStatusQueryHelper(
    actualPageOptions,
    request_status
  ) {
    const queryBuilder = await this.calendarRequestsEntity
      .createQueryBuilder('calendar_request')
      .where({status: request_status})
      .orderBy('calendar_request.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }

  public async getReqListByUserIdQueryHelper(actualPageOptions, searchParam) {
    const queryBuilder = await this.calendarRequestsEntity
      .createQueryBuilder('calendar_request')
      .where({user_id: searchParam})
      .orderBy('calendar_request.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }

  public async getEmpListWithCalendarReqsQueryHelper(actualPageOptions) {
    const queryBuilder = await this.employeeEntity
      .createQueryBuilder('employee')
      .innerJoinAndSelect(
        'employee.user_calendar_requests',
        'calendar_requests.user_id'
      )
      .orderBy('employee.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }
}
