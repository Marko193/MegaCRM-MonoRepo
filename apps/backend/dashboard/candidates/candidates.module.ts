import {Module} from '@nestjs/common';
import {CandidatesController} from './candidates.controller';
import {CandidatesService} from './candidates.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CandidatesEntity} from '../entities/candidates.entity';
import {PageOptionsDto} from '../pagination';
import {HelperFunctions} from '../constants';
import {ApiConfigModule} from '../config/config.module';

@Module({
  imports: [ApiConfigModule, TypeOrmModule.forFeature([CandidatesEntity])],
  controllers: [CandidatesController],
  providers: [CandidatesService, HelperFunctions, PageOptionsDto],
  exports: [CandidatesService, HelperFunctions, PageOptionsDto],
})
export class CandidatesModule {}
