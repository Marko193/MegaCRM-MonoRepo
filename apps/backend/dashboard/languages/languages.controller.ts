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
import {LanguagesService} from './languages.service';
import {LanguagesEntity} from '../entities/languages.entity';
import {LanguageItemDto} from './dto/language-item.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiOperation({summary: 'Get full languages list'})
  @ApiResponse({
    status: 200,
    description: 'All languages list',
    type: [LanguagesEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getLanguagesList() {
    return this.languagesService.getLanguagesList();
  }

  @Post('add')
  @ApiOperation({summary: 'Add new possible languages'})
  @ApiBody({
    description: 'Fill this fields to add new language',
    type: LanguageItemDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The language was successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async addLanguage(@Body() language_name: LanguageItemDto) {
    return this.languagesService.addLanguage(language_name);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update language by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: LanguageItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: LanguageItemDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async updateLanguage(@Body() positionDto: LanguageItemDto) {
    return this.languagesService.updateLanguage(positionDto);
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
    return this.languagesService.removeLanguage(+id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get position by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Language object',
    type: LanguagesEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getLanguageItemById(@Param('id') id: number) {
    return this.languagesService.getLanguageItemById(id);
  }
}
