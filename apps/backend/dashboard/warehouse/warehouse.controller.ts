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
import {WarehouseService} from './warehouse.service';
import {ApiBody, ApiOperation, ApiResponse} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {PageDto, PageOptionsDto} from '../pagination';

@UseGuards(JwtAuthenticationGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  @ApiOperation({
    summary: 'Get full warehouse items list',
  })
  @ApiResponse({
    status: 200,
    description: 'An array of warehouse items',
    type: [WarehouseItemEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getWarehouseItemsList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<WarehouseItemEntity>> {
    return this.warehouseService.getWarehouseItemsList(pageOptionsDto);
  }

  @Post('add')
  @ApiOperation({summary: 'Add new warehouseItem'})
  @ApiBody({
    description: 'Fill this fields to add new warehouseItem',
    type: WarehouseItemEntity,
  })
  @ApiResponse({
    status: 201,
    description: 'The warehouseItem was successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addWarehouseItem(@Body() warehouseItemDto: WarehouseItemEntity) {
    return this.warehouseService.addWarehouseItem(warehouseItemDto);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update warehouseItem by pair key-value',
  })
  @ApiBody({
    description: 'Fields, needed to insert warehouse item',
    type: WarehouseItemEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated WarehouseItem object',
    type: WarehouseItemEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateWarehouseItem(
    @Body() warehouseItemDto: WarehouseItemEntity
  ) {
    return this.warehouseService.updateWarehouseItem(warehouseItemDto);
  }

  @ApiOperation({summary: 'Remove warehouseItem from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'The warehouseItem with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removeWarehouseItem(@Param('id') id: string) {
    return this.warehouseService.removeWarehouseItem(+id);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get warehouseItem by ID'})
  @ApiResponse({
    status: 200,
    description: 'WarehouseItem object',
    type: WarehouseItemEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getEmployee(@Param('id') id: string) {
    return this.warehouseService.getWarehouseItemById(+id);
  }
}
