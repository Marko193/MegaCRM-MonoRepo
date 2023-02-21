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
import {WarehouseRequestsService} from './warehouse-requests.service';
import {WarehouseRequestEntity} from '../entities/warehouse-request.entity';
import {UserDecorator} from '../auth/user.decorator';
import {User} from '../entities/user.entity';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {PageDto, PageOptionsDto} from '../pagination';

@UseGuards(JwtAuthenticationGuard)
@Controller('warehouse-requests')
export class WarehouseRequestsController {
  constructor(
    private readonly warehouseRequestsService: WarehouseRequestsService
  ) {}

  @Get()
  @ApiOperation({summary: 'Get full warehouseRequests list'})
  @ApiResponse({
    status: 200,
    description: 'All warehouseRequests list',
    type: [WarehouseRequestEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getWarehouseRequestsList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<WarehouseRequestEntity>> {
    return this.warehouseRequestsService.getWarehouseRequestsList(
      pageOptionsDto
    );
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
    return this.warehouseRequestsService.getWarehouseRequestsFilteredList();
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible warehouseRequests'})
  @ApiBody({
    description: 'Fill this fields to add new warehouseRequest',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 201,
    description: 'Warehouse Request object',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addWarehouseRequest(
    @UserDecorator() user: User,
    @Body() warehouseRequestBody: WarehouseRequestEntity
  ) {
    return this.warehouseRequestsService.addWarehouseRequest(
      user,
      warehouseRequestBody
    );
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update warehouseRequest by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateWarehouseRequest(
    @Body() warehouseRequest: WarehouseRequestEntity
  ) {
    return this.warehouseRequestsService.updateWarehouseRequest(
      warehouseRequest
    );
  }

  @Patch('handle')
  @ApiOperation({
    summary:
      'Proceed warehouseRequest - change his status for approved / denied and updated user balance days',
  })
  @ApiBody({
    description: 'Receive warehouse request item body with updated status',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated warehouse request object',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async handleWarehouseRequest(
    @Body() warehouseRequest: {request_id: number; status: string}
  ) {
    return this.warehouseRequestsService.handleWarehouseRequest({
      request_id: warehouseRequest.request_id,
      status: warehouseRequest.status,
    });
  }

  @Patch('bind')
  @ApiOperation({
    summary: 'Bind warehouse item to user',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated warehouse item object',
    type: WarehouseItemEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async bindWarehouseItem(
    @Body() warehouseItem: {user_id: number; item_id: number}
  ) {
    return this.warehouseRequestsService.bindWarehouseItem({
      user_id: warehouseItem.user_id,
      item_id: warehouseItem.item_id,
    });
  }

  @Patch('un-bind')
  @ApiOperation({
    summary: 'Unbind warehouse item from user',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated warehouse item object',
    type: WarehouseItemEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async unBindWarehouseItem(
    @Body() warehouseItem: {user_id: number; item_id: number}
  ) {
    return this.warehouseRequestsService.unBindWarehouseItem({
      user_id: warehouseItem.user_id,
      item_id: warehouseItem.item_id,
    });
  }

  @Patch('cancel/:id')
  @ApiOperation({
    summary:
      'Cancel warehouseRequest - delete it from db and untie techique from user',
  })
  @ApiResponse({
    status: 200,
    description:
      'The warehouse request with id ${id} was successfully canceled.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async cancelWarehouseRequest(@Param('id') id: number) {
    return this.warehouseRequestsService.cancelWarehouseRequest(+id);
  }

  @ApiOperation({summary: 'Remove warehouseRequest from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'Just remove warehouse request from the system - without untie inventory item',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removeWarehouseRequest(@Param('id') id: string) {
    return this.warehouseRequestsService.removeWarehouseRequest(+id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get warehouseRequest by id',
  })
  @ApiResponse({
    status: 200,
    description: 'WarehouseRequest object',
    type: WarehouseRequestEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getWarehouseRequestById(@Param('id') id: number) {
    return this.warehouseRequestsService.getWarehouseRequestById(id);
  }
}
