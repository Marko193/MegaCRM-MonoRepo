import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {FamilyMembers} from '../entities/family-members.entity';
import {FamilyMembersService} from './family-members.service';
import {PageDto, PageOptionsDto} from '../pagination';

@UseGuards(JwtAuthenticationGuard)
@Controller('family-members')
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Get()
  @ApiOperation({summary: 'Get full family list'})
  @ApiResponse({
    status: 200,
    description: 'All family members list',
    type: [FamilyMembers],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getFamilyMembersList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<FamilyMembers>> {
    return this.familyMembersService.getFamilyMembersList(pageOptionsDto);
  }

  @Get('/:memberType')
  @ApiOperation({
    summary: 'Get full list of specific members (child/wife/husband)',
  })
  @ApiResponse({
    status: 200,
    description: 'Family member object with specific type (child/wife/husband)',
    type: [FamilyMembers],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getSpecificFamilyMemberList(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('memberType') familyMemberType: string
  ) {
    return this.familyMembersService.getSpecificFamilyMemberList(
      pageOptionsDto,
      familyMemberType
    );
  }
}
