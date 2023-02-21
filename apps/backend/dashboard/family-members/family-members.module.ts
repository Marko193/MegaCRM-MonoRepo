import {Module} from '@nestjs/common';
import {FamilyMembersController} from './family-members.controller';
import {FamilyMembersService} from './family-members.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FamilyMembers} from '../entities/family-members.entity';
import {PageOptionsDto} from '../pagination';
import {ApiConfigModule} from '../config/config.module';
import {HelperFunctions} from '../constants';

@Module({
  imports: [ApiConfigModule, TypeOrmModule.forFeature([FamilyMembers])],
  controllers: [FamilyMembersController],
  providers: [FamilyMembersService, PageOptionsDto, HelperFunctions],
  exports: [FamilyMembersService, PageOptionsDto, HelperFunctions],
})
export class FamilyMembersModule {}
