import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {PositionsEntity} from '../entities/positions.entity';
import {PositionItemDto} from './dto/position-item.dto';
import {CONNECTION} from '../tenancy/tenancy.symbols';
@Injectable()
export class PositionsService {
  private readonly positionsEntity: Repository<PositionsEntity>;
  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.positionsEntity = connection.getRepository(PositionsEntity);
  }

  public async getPositionsList(): Promise<PositionsEntity[]> {
    const positionsList = await this.positionsEntity.find();
    if (!positionsList) {
      throw new HttpException(
        'No position items were found!',
        HttpStatus.NOT_FOUND
      );
    }
    try {
      return positionsList;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async addPosition(
    position_name: PositionItemDto
  ): Promise<PositionsEntity> {
    try {
      const addedPosition = await this.positionsEntity.save(position_name);
      return await this.getPositionItemById(addedPosition.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updatePosition(positionBody): Promise<PositionsEntity> {
    const updatedPosition = await this.positionsEntity.preload(positionBody);
    if (!updatedPosition) {
      throw new HttpException(
        'Candidate with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.positionsEntity.save(updatedPosition);
      return await this.getPositionItemById(updatedPosition.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removePosition(id: number) {
    const position = await this.getPositionItemById(id);

    if (!position) {
      throw new HttpException(
        'Position with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.positionsEntity.delete(id);
      return {
        success: true,
        message: `The position with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getPositionItemById(id: number): Promise<PositionsEntity> {
    const positionItem = await this.positionsEntity.findOne({
      where: {
        id,
      },
    });
    if (!positionItem) {
      throw new HttpException(
        `Position item with such id was not found!`,
        HttpStatus.NOT_FOUND
      );
    }
    return positionItem;
  }
}
