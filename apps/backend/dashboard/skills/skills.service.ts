import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {SkillsEntity} from '../entities/skills.entity';
import {SkillNameItemDto} from './dto/skill-name-item.dto';
import {CONNECTION} from '../tenancy/tenancy.symbols';
@Injectable()
export class SkillsService {
  private readonly skillsEntity: Repository<SkillsEntity>;
  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.skillsEntity = connection.getRepository(SkillsEntity);
  }

  public async getSkillsList(): Promise<SkillsEntity[]> {
    const skillsList = await this.skillsEntity.find();
    if (!skillsList) {
      throw new HttpException(
        'No skill items were found!',
        HttpStatus.NOT_FOUND
      );
    }
    try {
      return skillsList;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async addSkill(name: SkillNameItemDto): Promise<SkillsEntity> {
    try {
      const addedSkill = await this.skillsEntity.save(name);
      return await this.getSkillItemById(addedSkill.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateSkill(skillBody): Promise<SkillsEntity> {
    const updatedSkill = await this.skillsEntity.preload(skillBody);
    if (!updatedSkill) {
      throw new HttpException(
        'Candidate with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.skillsEntity.save(updatedSkill);
      return await this.getSkillItemById(updatedSkill.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeSkill(id: number) {
    const skill = await this.getSkillItemById(id);

    if (!skill) {
      throw new HttpException(
        'Skill with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      await this.skillsEntity.delete(id);
      return {
        success: true,
        message: `The skill with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getSkillItemById(id: number): Promise<SkillsEntity> {
    const skillItem = await this.skillsEntity.findOne({
      where: {
        id,
      },
    });
    if (!skillItem) {
      throw new HttpException(
        `Skill item with such id was not found!`,
        HttpStatus.NOT_FOUND
      );
    }
    return skillItem;
  }
}
