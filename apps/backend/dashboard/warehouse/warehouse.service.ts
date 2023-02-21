import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {DataSource, Repository} from 'typeorm';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {PageDto, PageOptionsDto} from '../pagination';
import {HelperFunctions} from '../constants';
@Injectable()
export class WarehouseService {
  private readonly warehouseItemEntity: Repository<WarehouseItemEntity>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly initPageOptions: PageOptionsDto,
    private readonly helperFunctions: HelperFunctions
  ) {
    this.warehouseItemEntity = connection.getRepository(WarehouseItemEntity);
  }

  public async getWarehouseItemsList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<WarehouseItemEntity>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const dataPaginated = await this.getRawWarehouseItemsListQueryHelper(
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

  public async addWarehouseItem(
    warehouseItemBody
  ): Promise<WarehouseItemEntity> {
    try {
      const addedWarehouseItem = await this.warehouseItemEntity.save(
        warehouseItemBody
      );
      return this.getWarehouseItemById(addedWarehouseItem.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateWarehouseItem(
    warehouseItemBody
  ): Promise<WarehouseItemEntity> {
    const updatedWarehouseItem = await this.warehouseItemEntity.preload(
      warehouseItemBody
    );

    if (!updatedWarehouseItem) {
      throw new HttpException(
        'WarehouseItem with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.warehouseItemEntity.save(updatedWarehouseItem);
      return this.getWarehouseItemById(updatedWarehouseItem.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeWarehouseItem(id: number) {
    const warehouseItem = this.getWarehouseItemById(id);

    if (!warehouseItem) {
      throw new HttpException(
        'WarehouseItem with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.warehouseItemEntity.delete(id);

      return {
        success: true,
        message: `The warehouseItem with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getWarehouseItemById(id: number): Promise<WarehouseItemEntity> {
    const warehouseItem = await this.warehouseItemEntity.findOne({
      where: {
        id: id,
      },
    });
    if (!warehouseItem) {
      throw new HttpException(
        'WarehouseItem with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
    try {
      return warehouseItem;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getRawWarehouseItemsListQueryHelper(actualPageOptions) {
    const queryBuilder = await this.warehouseItemEntity
      .createQueryBuilder('warehouse_item')
      .orderBy('warehouse_item.created_at', actualPageOptions.order)
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
