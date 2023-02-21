import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {FamilyMembers} from '../entities/family-members.entity';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import {PageDto, PageOptionsDto} from '../pagination';
import {HelperFunctions} from '../constants';
@Injectable()
export class FamilyMembersService {
  private readonly familyMembersEntity: Repository<FamilyMembers>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private readonly initPageOptions: PageOptionsDto,
    private readonly helperFunctions: HelperFunctions
  ) {
    this.familyMembersEntity = connection.getRepository(FamilyMembers);
  }

  public async getFamilyMembersList(
    initPageOptions: PageOptionsDto
  ): Promise<PageDto<FamilyMembers>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const dataPaginated = await this.getRawFamilyMembersListQueryHelper(
        actualPageOptions
      );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getSpecificFamilyMemberList(
    initPageOptions: PageOptionsDto,
    familyMemberType
  ): Promise<PageDto<FamilyMembers>> {
    try {
      const actualPageOptions =
        this.initPageOptions.checkQueryParamsFunction(initPageOptions);

      const dataPaginated = await this.getFilteredFamilyMembersListQueryHelper(
        actualPageOptions,
        familyMemberType
      );
      return new PageDto(dataPaginated.entities, dataPaginated.pageMetaDto);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getRawFamilyMembersListQueryHelper(actualPageOptions) {
    const queryBuilder = await this.familyMembersEntity
      .createQueryBuilder('family_member')
      .orderBy('family_member.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }

  public async getFilteredFamilyMembersListQueryHelper(
    actualPageOptions,
    familyMemberType
  ) {
    const queryBuilder = await this.familyMembersEntity
      .createQueryBuilder('family_member')
      .where({family_member_type: familyMemberType})
      .orderBy('family_member.created_at', actualPageOptions.order)
      .skip(
        this.initPageOptions.skip(
          actualPageOptions.page,
          actualPageOptions.limit
        )
      )
      .take(actualPageOptions.limit);

    return this.helperFunctions.createQueryPaginateDataHelper(
      actualPageOptions,
      queryBuilder
    );
  }
}
