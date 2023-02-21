import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {MeetingRequestEntity} from '../entities/meeting-request.entity';
import {EmployeesService} from '../employees/employees.service';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {HelperFunctions} from '../constants';
import {PositionsEntity} from '../entities/positions.entity';
import {PositionsService} from '../positions/positions.service';
import {UserMeetingsRequestsItemsEntity} from '../entities/user-meetings-requests.entity';
import {PageDto, PageOptionsDto} from '../pagination';

@Injectable()
export class MeetingRequestsService {
  private readonly meetingRequestsEntity: Repository<MeetingRequestEntity>;
  private readonly userMeetingsRequestsItemsEntity: Repository<UserMeetingsRequestsItemsEntity>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly initPageOptions: PageOptionsDto,
    private readonly employeesService: EmployeesService,
    private readonly helperFunctions: HelperFunctions,
    private readonly positionsService: PositionsService
  ) {
    this.meetingRequestsEntity = connection.getRepository(MeetingRequestEntity);
    this.userMeetingsRequestsItemsEntity = connection.getRepository(
      UserMeetingsRequestsItemsEntity
    );
  }

  public async getMeetingRequestsList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<MeetingRequestEntity>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const dataPaginated = await this.getRawMeetingsRequestsListQueryHelper(
        actualPageOptions
      );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      console.log('err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async addMeetingRequest(meetingRequestBody) {
    const askedHoursNumber =
      this.helperFunctions.calculateDaysNumber(
        meetingRequestBody.end_date,
        meetingRequestBody.start_date
      ) * 24;

    if (askedHoursNumber < 0.5) {
      throw new HttpException(
        `The meeting should be at least half an hour (30 minutes)!`,
        HttpStatus.FORBIDDEN
      );
    }

    try {
      const organizer = await this.employeesService.findRawEmployeeById(
        meetingRequestBody.organizer_id
      );
      const organizerPositionInfo: PositionsEntity =
        await this.positionsService.getPositionItemById(
          organizer.user_position.position_info
        );

      const createdMeeting = await this.meetingRequestsEntity.save({
        ...meetingRequestBody,
        organizer_name: organizer.name,
        organizer_surname: organizer.surname,
        organizer_position: organizerPositionInfo.position_name,
      });

      for (const user_id of meetingRequestBody.users_id_list) {
        await this.userMeetingsRequestsItemsEntity.save({
          meeting_id: createdMeeting.id,
          user_id: user_id,
        });
      }

      return this.meetingRequestsEntity.findOne({
        where: {id: createdMeeting.id},
      });
    } catch (err) {
      console.log('add cal_req err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateMeetingRequest(
    meetingRequestBody
  ): Promise<MeetingRequestEntity> {
    const updatedMeetingRequest = await this.meetingRequestsEntity.preload(
      meetingRequestBody
    );
    if (!updatedMeetingRequest) {
      throw new HttpException(
        'Meeting request with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.meetingRequestsEntity.save(updatedMeetingRequest);
      return this.meetingRequestsEntity.findOne({
        where: {id: updatedMeetingRequest.id},
      });
    } catch (err) {
      console.log('update cal_req err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeMeetingRequest(id: number) {
    const meetingRequest = await this.getMeetingRequestById(id);

    if (!meetingRequest) {
      throw new HttpException(
        'MeetingRequest with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.meetingRequestsEntity.delete(id);
      return {
        success: true,
        message: `The meetingRequest with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getMeetingRequestById(
    request_id: number
  ): Promise<MeetingRequestEntity> {
    const meetingRequestItem = await this.meetingRequestsEntity.findOne({
      where: {
        id: request_id,
      },
      relations: ['meetings_requests_items.user_id'],
    });
    if (!meetingRequestItem) {
      throw new NotFoundException();
    }
    try {
      return meetingRequestItem;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getMeetingRequestsListByType(
    initPageOptions: PageOptionsDto,
    request_type
  ): Promise<PageDto<MeetingRequestEntity>> {
    const actualPageOptions =
      this.initPageOptions.checkQueryParamsFunction(initPageOptions);

    const dataPaginated = await this.getFilteredMeetingsRequestsListQueryHelper(
      actualPageOptions,
      request_type
    );
    return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
  }

  public async getRawMeetingsRequestsListQueryHelper(actualPageOptions) {
    const meetingsItems = await this.meetingRequestsEntity.find({
      relations: ['meetings_requests_items.user_id'],
      order: {['created_at']: actualPageOptions.order},
      skip: this.initPageOptions.skip(
        actualPageOptions.page,
        actualPageOptions.limit
      ),
      take: actualPageOptions.limit,
    });

    return await this.helperFunctions.createSelectPaginateDataHelper(
      actualPageOptions,
      await this.meetingRequestsEntity.find({}),
      meetingsItems
    );
  }

  public async getFilteredMeetingsRequestsListQueryHelper(
    actualPageOptions,
    request_type
  ) {
    const meetingsItems = await this.meetingRequestsEntity.find({
      relations: ['meetings_requests_items.user_id'],
      where: {type: request_type},
      order: {['created_at']: actualPageOptions.order},
      skip: this.initPageOptions.skip(
        actualPageOptions.page,
        actualPageOptions.limit
      ),
      take: actualPageOptions.limit,
    });

    return await this.helperFunctions.createSelectPaginateDataHelper(
      actualPageOptions,
      await this.meetingRequestsEntity.find({where: {type: request_type}}),
      meetingsItems
    );
  }
}
