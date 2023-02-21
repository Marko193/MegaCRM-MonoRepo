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
import {SkillsService} from './skills.service';
import {SkillsEntity} from '../entities/skills.entity';
import {SkillNameItemDto} from './dto/skill-name-item.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({summary: 'Get full skills list'})
  @ApiResponse({
    status: 200,
    description: 'All skills list',
    type: [SkillsEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getSkillsList() {
    return this.skillsService.getSkillsList();
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible skills'})
  @ApiBody({
    description: 'Fill this fields to add new skill',
    type: SkillNameItemDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The skill was successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addSkill(@Body() skill_name: SkillNameItemDto) {
    return this.skillsService.addSkill(skill_name);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update skill by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: SkillNameItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: SkillNameItemDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateSkill(@Body() skillDto: SkillNameItemDto) {
    return this.skillsService.updateSkill(skillDto);
  }

  @ApiOperation({summary: 'Remove skill from DB by ID'})
  @ApiResponse({
    status: 204,
    description: 'The skill with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removeSkill(@Param('id') id: string) {
    return this.skillsService.removeSkill(+id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get skill by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Skill object',
    type: SkillsEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getSkillItemById(@Param('id') id: number) {
    return this.skillsService.getSkillItemById(id);
  }
}
