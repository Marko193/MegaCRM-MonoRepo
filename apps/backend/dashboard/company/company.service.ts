import {InjectRepository} from '@nestjs/typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {Repository, EntityManager, DataSource} from 'typeorm';
import {Company} from '../entities/company.entity';
import {connectionOptions} from '../config/tenancy-db-config';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly entityManager: EntityManager
  ) {}

  public async findCompany(company_name: string): Promise<Company> {
    try {
      const company = await this.companyRepository.findOne({
        where: {
          company_name: company_name,
        },
      });
      if (company) {
        return company;
      }
      throw new NotFoundException();
    } catch (error) {
      throw new HttpException('Company does not found', HttpStatus.NOT_FOUND);
    }
  }

  public async createCompany(company_name: string): Promise<Company> {
    try {
      const company = new Company();

      company.company_name = company_name.toLowerCase();
      company.status = true;

      const savedCompany = await this.companyRepository.save(company);

      const schemaCompanyName = `company_${company.company_id}`;

      await this.entityManager.query(
        `CREATE SCHEMA IF NOT EXISTS "${schemaCompanyName}"`
      );

      const companyMetadata = new DataSource(
        connectionOptions(schemaCompanyName)
      );

      await companyMetadata.initialize();
      await companyMetadata.runMigrations();

      return savedCompany;
    } catch (error) {
      throw new HttpException(
        'Company name should be unique',
        HttpStatus.NOT_FOUND
      );
    }
  }
}
