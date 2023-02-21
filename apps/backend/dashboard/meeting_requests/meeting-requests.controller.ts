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
import {MeetingRequestsService} from './meeting-requests.service';
import {MeetingRequestEntity} from '../entities/meeting-request.entity';
import {PageDto, PageOptionsDto} from '../pagination';

@UseGuards(JwtAuthenticationGuard)
@Controller('meetings')
export class MeetingRequestsController {
  constructor(private readonly meetingsService: MeetingRequestsService) {}

  @Get()
  @ApiOperation({summary: 'Get full meetings list'})
  @ApiResponse({
    status: 200,
    description: 'All meetings list',
    type: [MeetingRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getMeetingRequestsList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<MeetingRequestEntity>> {
    return this.meetingsService.getMeetingRequestsList(pageOptionsDto);
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible   meetings'})
  @ApiBody({
    description: 'Fill this fields to add new meetingRequest',
    type: MeetingRequestEntity,
  })
  @ApiResponse({
    status: 201,
    description: 'Meeting Request object',
    type: MeetingRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addMeetingRequest(
    @Body() meetingRequestBody: MeetingRequestEntity
  ) {
    return this.meetingsService.addMeetingRequest(meetingRequestBody);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update meetingRequest by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: MeetingRequestEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: MeetingRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateMeetingRequest(
    @Body() meetingRequestDto: MeetingRequestEntity
  ) {
    return this.meetingsService.updateMeetingRequest(meetingRequestDto);
  }

  @ApiOperation({summary: 'Remove meetingRequest from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'The meetingRequest with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removeMeetingRequest(@Param('id') id: string) {
    return this.meetingsService.removeMeetingRequest(+id);
  }

  @Get('request-type/:request_type')
  @ApiOperation({
    summary: 'Get full list of meeting requests with specific request type',
  })
  @ApiResponse({
    status: 200,
    description: 'Users array of objects with meeting requests',
    type: [MeetingRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getMeetingRequestsListByType(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('request_type') request_type: string
  ): Promise<PageDto<MeetingRequestEntity>> {
    return this.meetingsService.getMeetingRequestsListByType(
      pageOptionsDto,
      request_type
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get meetingRequest by id',
  })
  @ApiResponse({
    status: 200,
    description: 'MeetingRequest object',
    type: MeetingRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getMeetingRequestById(@Param('id') id: number) {
    return this.meetingsService.getMeetingRequestById(id);
  }
}
