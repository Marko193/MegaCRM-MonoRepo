import {Module} from '@nestjs/common';
import {LanguagesLevelController} from './languages-level.controller';
import {LanguagesLevelService} from './languages-level.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LanguagesLevelEntity} from '../entities/languages-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LanguagesLevelEntity])],
  controllers: [LanguagesLevelController],
  providers: [LanguagesLevelService],
  exports: [LanguagesLevelService],
})
export class LanguagesLevelModule {}
