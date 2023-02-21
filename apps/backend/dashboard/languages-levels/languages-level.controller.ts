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
import {LanguagesLevelService} from './languages-level.service';
import {LanguagesLevelEntity} from '../entities/languages-level.entity';
import {LanguageLevelItemDto} from './dto/language-level-item.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('languages-levels')
export class LanguagesLevelController {
  constructor(private readonly languagesLevelsService: LanguagesLevelService) {}

  @Get()
  @ApiOperation({summary: 'Get full languages list'})
  @ApiResponse({
    status: 200,
    description: 'All languages list',
    type: [LanguagesLevelEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getLanguagesLevelsList() {
    return this.languagesLevelsService.getLanguagesLevelsList();
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible languages'})
  @ApiBody({
    description: 'Fill this fields to add new language',
    type: LanguageLevelItemDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The language level was successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addLanguageLevel(@Body() language_name: LanguageLevelItemDto) {
    return this.languagesLevelsService.addLanguageLevel(language_name);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update language level by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: LanguageLevelItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: LanguageLevelItemDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateLanguage(@Body() languageLevelDto: LanguageLevelItemDto) {
    return this.languagesLevelsService.updateLanguage(languageLevelDto);
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
  public async removeLanguage(@Param('id') id: string) {
    return this.languagesLevelsService.removeLanguage(+id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get position by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Language object',
    type: LanguagesLevelEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getLanguageLevelItemById(@Param('id') id: number) {
    return this.languagesLevelsService.getLanguageLevelItemById(id);
  }
}
