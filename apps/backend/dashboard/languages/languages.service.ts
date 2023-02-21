import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {LanguagesEntity} from '../entities/languages.entity';
import {LanguageItemDto} from './dto/language-item.dto';
import {CONNECTION} from '../tenancy/tenancy.symbols';

@Injectable()
export class LanguagesService {
  private readonly languagesEntity: Repository<LanguagesEntity>;
  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.languagesEntity = connection.getRepository(LanguagesEntity);
  }

  public async getLanguagesList(): Promise<LanguagesEntity[]> {
    const languagesList = await this.languagesEntity.find();
    if (!languagesList) {
      throw new HttpException(
        'No language items were found!',
        HttpStatus.NOT_FOUND
      );
    }
    try {
      return languagesList;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async addLanguage(name: LanguageItemDto): Promise<LanguagesEntity> {
    try {
      const addedLanguage = await this.languagesEntity.save(name);
      return await this.getLanguageItemById(addedLanguage.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateLanguage(languageBody): Promise<LanguagesEntity> {
    const updatedLanguage = await this.languagesEntity.preload(languageBody);
    if (!updatedLanguage) {
      throw new HttpException(
        'Language with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.languagesEntity.save(updatedLanguage);
      return await this.getLanguageItemById(updatedLanguage.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeLanguage(id: number) {
    const language = await this.getLanguageItemById(id);

    if (!language) {
      throw new HttpException(
        'Language with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.languagesEntity.delete(id);
      return {
        success: true,
        message: `The language with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getLanguageItemById(id: number): Promise<LanguagesEntity> {
    const languageItem = await this.languagesEntity.findOne({
      where: {
        id,
      },
    });
    if (!languageItem) {
      throw new HttpException(
        `Language item with such id was not found!`,
        HttpStatus.NOT_FOUND
      );
    }
    return languageItem;
  }
}
