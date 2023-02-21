import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {LanguagesLevelEntity} from '../entities/languages-level.entity';
import {LanguageLevelItemDto} from './dto/language-level-item.dto';
import {CONNECTION} from '../tenancy/tenancy.symbols';
@Injectable()
export class LanguagesLevelService {
  private readonly languagesLevelEntity: Repository<LanguagesLevelEntity>;
  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.languagesLevelEntity = connection.getRepository(LanguagesLevelEntity);
  }

  public async getLanguagesLevelsList(): Promise<LanguagesLevelEntity[]> {
    const languagesLevelsList = await this.languagesLevelEntity.find();
    if (!languagesLevelsList) {
      throw new HttpException(
        'No language level items were found!',
        HttpStatus.NOT_FOUND
      );
    }
    return languagesLevelsList;
  }

  public async addLanguageLevel(
    name: LanguageLevelItemDto
  ): Promise<LanguagesLevelEntity> {
    try {
      const addedLanguage = await this.languagesLevelEntity.save(name);
      return this.getLanguageLevelItemById(addedLanguage.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateLanguage(languageBody): Promise<LanguagesLevelEntity> {
    const updatedLanguage = await this.languagesLevelEntity.preload(
      languageBody
    );
    if (!updatedLanguage) {
      throw new HttpException(
        'Language-level with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.languagesLevelEntity.save(updatedLanguage);
      return this.getLanguageLevelItemById(updatedLanguage.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeLanguage(id: number) {
    const language = this.getLanguageLevelItemById(id);

    if (!language) {
      throw new HttpException(
        'Language with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.languagesLevelEntity.delete(id);
      return {
        success: true,
        message: `The language level with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getLanguageLevelItemById(
    id: number
  ): Promise<LanguagesLevelEntity> {
    const languageLevelItem = await this.languagesLevelEntity.findOne({
      where: {
        id,
      },
    });
    if (!languageLevelItem) {
      throw new HttpException(
        `Language item with such id was not found!`,
        HttpStatus.NOT_FOUND
      );
    }

    return languageLevelItem;
  }
}
