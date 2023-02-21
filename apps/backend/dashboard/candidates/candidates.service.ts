import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CandidatesEntity} from '../entities/candidates.entity';
import {DataSource, Repository} from 'typeorm';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {deleteFileName} from '../helpers/fileUpload';
import {PageDto, PageOptionsDto} from '../pagination';
import {HelperFunctions} from '../constants';
@Injectable()
export class CandidatesService {
  private readonly candidateEntity: Repository<CandidatesEntity>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly initPageOptions: PageOptionsDto,
    private readonly helperFunctions: HelperFunctions
  ) {
    this.candidateEntity = connection.getRepository(CandidatesEntity);
  }

  public async getCandidatesList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<CandidatesEntity>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const candidates = await this.candidateEntity.find({
        relations: [
          'candidate_position.position_info',
          'candidate_languages.language_level_info',
          'candidate_languages.language_name_id',
          'candidate_skills.skill_info',
        ],
        order: {['created_at']: actualPageOptions.order},
        skip: this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        ),
        take: actualPageOptions.limit,
      });

      const dataPaginated =
        await this.helperFunctions.createSelectPaginateDataHelper(
          actualPageOptions,
          await this.candidateEntity.find({}),
          candidates
        );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      console.log('err', err);
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async addCandidate(candidate, avatar): Promise<CandidatesEntity> {
    try {
      const addedCandidate = await this.candidateEntity.save({
        ...candidate,
        avatar: avatar === null || undefined ? null : avatar?.filename,
      });
      return this.getCandidateById(addedCandidate.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateCandidate(
    initCandidate,
    avatar
  ): Promise<CandidatesEntity> {
    const updatedCandidate = await this.candidateEntity.preload(initCandidate);

    if (!updatedCandidate) {
      throw new HttpException(
        'Candidate with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    if (avatar ?? undefined) {
      await deleteFileName(updatedCandidate.avatar);
    }

    try {
      await this.candidateEntity.save({
        ...updatedCandidate,
        avatar:
          avatar === null || undefined
            ? updatedCandidate.avatar
            : avatar?.filename,
      });
      return this.getCandidateById(updatedCandidate.id);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async removeCandidate(id: number) {
    const candidateForDeleting = await this.getCandidateById(id);

    if (!candidateForDeleting) {
      throw new HttpException(
        'Candidate with this id does not exist.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      if (candidateForDeleting.avatar !== null) {
        await deleteFileName(candidateForDeleting.avatar);
      }
      await this.candidateEntity.delete(id);

      return {
        success: true,
        message: `The candidate with id ${id} was successfully removed from system`,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCandidateById(id: number): Promise<CandidatesEntity> {
    const candidate = await this.candidateEntity.findOne({
      relations: [
        'candidate_position.position_info',
        'candidate_languages.language_level_info',
        'candidate_languages.language_name_id',
        'candidate_skills.skill_info',
      ],
      where: {
        id: id,
      },
    });
    if (!candidate) {
      throw new HttpException(
        'Candidate with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
    try {
      return candidate;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
