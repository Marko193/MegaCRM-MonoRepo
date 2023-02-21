import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {WarehouseRequestEntity} from '../entities/warehouse-request.entity';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {UserWarehouseItemsEntity} from '../entities/user-warehouse-items.entity';
import {User} from '../entities/user.entity';
import {WarehouseService} from '../warehouse/warehouse.service';
import {EmployeesService} from '../employees/employees.service';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {WarehouseItemStatuses} from '../enums';
import {PositionsEntity} from '../entities/positions.entity';
import {PositionsService} from '../positions/positions.service';
import {HelperFunctions} from '../constants';
import {PageDto, PageOptionsDto} from '../pagination';

@Injectable()
export class WarehouseRequestsService {
  private readonly warehouseRequestEntity: Repository<WarehouseRequestEntity>;
  private readonly userWarehouseItemEntity: Repository<UserWarehouseItemsEntity>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly warehouseService: WarehouseService,
    private readonly employeesService: EmployeesService,
    private readonly helperFunctions: HelperFunctions,
    private readonly positionsService: PositionsService,
    private readonly initPageOptions: PageOptionsDto
  ) {
    this.warehouseRequestEntity = connection.getRepository(
      WarehouseRequestEntity
    );
    this.userWarehouseItemEntity = connection.getRepository(
      UserWarehouseItemsEntity
    );
  }

  public async getWarehouseRequestsList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<WarehouseRequestEntity>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const dataPaginated = await this.getRawWarehouseRequestsListQueryHelper(
        actualPageOptions
      );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getWarehouseRequestsFilteredList(): Promise<
    WarehouseRequestEntity[]
  > {
    const users = await this.employeesService.getRawEmployeeListHelper();
    return this.helperFunctions.getYearsTimestampsRequestsList(
      users,
      'warehouseRequests'
    );
  }

  public async addWarehouseRequest(
    userInit: User,
    warehouseRequestBody: WarehouseRequestEntity
  ): Promise<WarehouseRequestEntity> {
    const warehouseItem = await this.warehouseService.getWarehouseItemById(
      warehouseRequestBody.item_id
    );

    const user = await this.employeesService.findRawEmployeeById(userInit.id);

    if (warehouseItem.item_status === 'using') {
      throw new HttpException(
        `This warehouse item is already using!`,
        HttpStatus.FORBIDDEN
      );
    }

    try {
      const assignedHr = await this.employeesService.findEmployeeByIdHelper(
        user.assigned_hr_id
      );

      const userPosition: PositionsEntity =
        await this.positionsService.getPositionItemById(
          user.user_position.position_info
        );

      const addedWarehouseRequest = await this.warehouseRequestEntity.save({
        ...warehouseRequestBody,
        user_id: user.id,
        user_name: user.name,
        user_surname: user.surname,
        user_position: userPosition.position_name,
        reviewer_id: assignedHr.id,
        reviewer_name: assignedHr.name,
        reviewer_surname: assignedHr.surname,
        reviewer_position: assignedHr.role_info.role,
      });
      return this.getWarehouseRequestById(addedWarehouseRequest.id);
    } catch (err) {
      console.log('add warehouse request err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateWarehouseRequest(
    warehouseRequestBody
  ): Promise<WarehouseRequestEntity> {
    const updatedWarehouseRequest = await this.warehouseRequestEntity.preload(
      warehouseRequestBody
    );
    if (!updatedWarehouseRequest) {
      throw new HttpException(
        'Warehouse request with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.warehouseRequestEntity.save(updatedWarehouseRequest);
      return this.getWarehouseRequestById(updatedWarehouseRequest.id);
    } catch (err) {
      console.log('update cal_req err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async handleWarehouseRequest(
    handleWarehouseRequestBody
  ): Promise<WarehouseRequestEntity | WarehouseItemEntity> {
    const warehouseRequest = await this.warehouseRequestEntity.findOne({
      where: {
        id: handleWarehouseRequestBody.request_id,
      },
    });

    if (!warehouseRequest) {
      throw new HttpException(
        `This warehouse request does not exist.`,
        HttpStatus.NOT_FOUND
      );
    }

    if (warehouseRequest.status === 'approved') {
      throw new HttpException(
        `This warehouse request is already approved.`,
        HttpStatus.FORBIDDEN
      );
    }

    warehouseRequest.status = handleWarehouseRequestBody.status;
    await this.warehouseRequestEntity.save(warehouseRequest);

    if (handleWarehouseRequestBody.status === 'approved') {
      return this.bindWarehouseItem(warehouseRequest);
    }
    return this.getWarehouseRequestById(handleWarehouseRequestBody.request_id);
  }

  public async cancelWarehouseRequest(
    id: number
  ): Promise<WarehouseRequestEntity | WarehouseItemEntity | unknown> {
    const warehouseRequest = await this.warehouseRequestEntity.findOne({
      where: {
        id: id,
      },
    });

    if (warehouseRequest.status === 'processing') {
      throw new HttpException(
        'You can`t cancel processing request!',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.unBindWarehouseItem(warehouseRequest);
      await this.warehouseRequestEntity.delete(id);

      return {
        success: true,
        message: `The warehouse request with id ${id} was successfully cancelled!`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeWarehouseRequest(id: number) {
    const warehouseRequest = this.getWarehouseRequestById(id);

    if (!warehouseRequest) {
      throw new HttpException(
        'Warehouse request with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.warehouseRequestEntity.delete(id);
      return {
        success: true,
        message: `The warehouse Request with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async bindWarehouseItem(
    warehouseItemDto
  ): Promise<WarehouseRequestEntity | WarehouseItemEntity> {
    const warehouseItem: WarehouseItemEntity =
      await this.warehouseService.getWarehouseItemById(
        warehouseItemDto.item_id
      );

    if (warehouseItem.item_status === 'using') {
      throw new HttpException(
        `This warehouse item is already using!`,
        HttpStatus.FORBIDDEN
      );
    }

    warehouseItem.item_status = 'using' as WarehouseItemStatuses;
    await this.warehouseService.updateWarehouseItem(warehouseItem);

    await this.userWarehouseItemEntity.save({
      user_id: warehouseItemDto.user_id,
      warehouse_item_id: warehouseItemDto.item_id,
    });

    return await this.warehouseService.getWarehouseItemById(
      warehouseItemDto.item_id
    );
  }

  public async unBindWarehouseItem(
    unbindWarehouseItem
  ): Promise<WarehouseRequestEntity | WarehouseItemEntity> {
    await this.userWarehouseItemEntity.delete({
      user_id: unbindWarehouseItem.user_id,
    });

    const warehouseItem: WarehouseItemEntity =
      await this.warehouseService.getWarehouseItemById(
        unbindWarehouseItem.item_id
      );

    warehouseItem.item_status = 'free' as WarehouseItemStatuses;
    await this.warehouseService.updateWarehouseItem(warehouseItem);

    return await this.warehouseService.getWarehouseItemById(
      unbindWarehouseItem.item_id
    );
  }

  public async getWarehouseRequestById(
    item_id: number
  ): Promise<WarehouseRequestEntity> {
    const warehouseRequestItem = await this.warehouseRequestEntity.findOne({
      where: {
        id: item_id,
      },
      relations: ['item_id'],
    });
    if (!warehouseRequestItem) {
      throw new NotFoundException();
    }
    try {
      return warehouseRequestItem;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getRawWarehouseRequestsListQueryHelper(actualPageOptions) {
    const queryBuilder = await this.warehouseRequestEntity
      .createQueryBuilder('warehouse_requests')
      .innerJoinAndSelect('warehouse_requests.item_id', 'item_id.name')
      .orderBy('warehouse_requests.created_at', actualPageOptions.order)
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
