import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {CalendarRequestsService} from './calendar-requests.service';
import {CalendarRequestItemDto} from './dto/calendar-request-item.dto';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {PageDto, PageOptionsDto} from '../pagination';

@UseGuards(JwtAuthenticationGuard)
@Controller('calendar-requests')
export class CalendarRequestsController {
  constructor(
    private readonly calendarRequestsService: CalendarRequestsService
  ) {}

  @Get()
  @ApiOperation({summary: 'Get full calendarRequests list'})
  @ApiResponse({
    status: 200,
    description: 'All calendarRequests list',
    type: [CalendarRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCalendarRequestsList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<CalendarRequestEntity>> {
    return this.calendarRequestsService.getCalendarRequestsList(pageOptionsDto);
  }

  @Get('years-timestamps')
  @ApiOperation({
    summary: 'Get full calendarRequests list with years-timestamps',
  })
  @ApiResponse({
    status: 200,
    description: 'All calendarRequests list with years-timestamps filters',
    type: [CalendarRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCalendarReqYearsFilteringList() {
    return this.calendarRequestsService.getCalendarReqYearsFilteringList();
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible calendarRequests'})
  @ApiBody({
    description: 'Fill this fields to add new calendarRequest',
    type: CalendarRequestItemDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Calendar Request object',
    type: CalendarRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addCalendarRequest(
    @Body() calendarRequestBody: CalendarRequestItemDto
  ) {
    return this.calendarRequestsService.addCalendarRequest(calendarRequestBody);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update calendarRequest by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: CalendarRequestItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: CalendarRequestItemDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateCalendarRequest(
    @Body() calendarRequestDto: CalendarRequestItemDto
  ) {
    return this.calendarRequestsService.updateCalendarRequest(
      calendarRequestDto
    );
  }

  @Patch('handle')
  @ApiOperation({
    summary:
      'Proceed calendarRequest - change his status for approved / denied and updated user balance days',
  })
  @ApiBody({
    description: 'Receive calendar request item body with updated status',
    type: CalendarRequestItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated calendar request object',
    type: CalendarRequestItemDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async handleCalendarRequest(
    @Body() calendarRequestDto: CalendarRequestItemDto
  ) {
    return this.calendarRequestsService.handleCalendarRequest({
      id: calendarRequestDto.id,
      status: calendarRequestDto.status,
    });
  }

  @Patch('cancel/:id')
  @ApiOperation({
    summary:
      'Cancel calendarRequest - delete it from db and return user wasted amount of days on balance',
  })
  @ApiResponse({
    status: 200,
    description:
      'The calendar request with id ${id} was successfully canceled.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async cancelCalendarRequest(@Param('id') id: number) {
    return this.calendarRequestsService.cancelCalendarRequest(+id);
  }

  @ApiOperation({summary: 'Remove calendarRequest from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'The calendarRequest with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removeCalendarRequest(@Param('id') id: string) {
    return this.calendarRequestsService.removeCalendarRequest(+id);
  }

  @Get('/request-type/:request_type')
  @ApiOperation({
    summary: 'Get full list of calendar requests with specific request type',
  })
  @ApiResponse({
    status: 200,
    description: 'Users array of objects with calendar requests',
    type: [CalendarRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCalendarRequestsListByType(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('request_type') request_type: string
  ): Promise<PageDto<CalendarRequestEntity>> {
    return this.calendarRequestsService.getCalendarRequestsListByType(
      pageOptionsDto,
      request_type
    );
  }

  @Get('/request-status/:request_status')
  @ApiOperation({
    summary: 'Get full list of calendar requests with specific request status',
  })
  @ApiResponse({
    status: 200,
    description: 'Users array of objects with calendar requests',
    type: [CalendarRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCalendarRequestsListByStatus(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('request_status') request_status: string
  ): Promise<PageDto<CalendarRequestEntity>> {
    return this.calendarRequestsService.getCalendarRequestsListByStatus(
      pageOptionsDto,
      request_status
    );
  }

  @Get('employee/:id')
  @ApiOperation({
    summary: 'Get all calendarRequests by specific user id',
  })
  @ApiResponse({
    status: 200,
    description: 'CalendarRequests array of objects',
    type: [CalendarRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCalendarRequestsByUserId(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: number
  ): Promise<PageDto<CalendarRequestEntity>> {
    return await this.calendarRequestsService.getCalendarRequestsByUserId(
      pageOptionsDto,
      id
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get calendarRequest by id',
  })
  @ApiResponse({
    status: 200,
    description: 'CalendarRequest object',
    type: CalendarRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCalendarRequestById(@Param('id') id: number) {
    return this.calendarRequestsService.getCalendarRequestById(id);
  }
}
