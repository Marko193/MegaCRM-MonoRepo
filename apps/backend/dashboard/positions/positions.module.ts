import {Module} from '@nestjs/common';
import {PositionsController} from './positions.controller';
import {PositionsService} from './positions.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PositionsEntity} from '../entities/positions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionsEntity])],
  controllers: [PositionsController],
  providers: [PositionsService],
  exports: [PositionsService],
})
export class PositionsModule {}
