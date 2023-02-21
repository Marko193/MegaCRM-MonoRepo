import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {PositionsService} from './positions.service';
import {PositionsEntity} from '../entities/positions.entity';
import {PositionItemDto} from './dto/position-item.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  @ApiOperation({summary: 'Get full positions list'})
  @ApiResponse({
    status: 200,
    description: 'All positions list',
    type: [PositionsEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getPositionsList() {
    return this.positionsService.getPositionsList();
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible positions'})
  @ApiBody({
    description: 'Fill this fields to add new position',
    type: PositionItemDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The position was successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addPosition(@Body() position_name: PositionItemDto) {
    return this.positionsService.addPosition(position_name);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update position by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: PositionItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: PositionItemDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updatePosition(@Body() positionDto: PositionItemDto) {
    return this.positionsService.updatePosition(positionDto);
  }

  @ApiOperation({summary: 'Remove position from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'The position with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removePosition(@Param('id') id: string) {
    return this.positionsService.removePosition(+id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get position by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Position object',
    type: PositionsEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getPositionItemById(@Param('id') id: number) {
    return this.positionsService.getPositionItemById(id);
  }
}
