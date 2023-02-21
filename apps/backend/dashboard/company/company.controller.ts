import {CompanyService} from './company.service';
import {Body, Controller, Post} from '@nestjs/common';
import {CompanyDto} from './dto/company.dto';
import {Company} from '../entities/company.entity';
import {ApiBody, ApiOperation, ApiResponse} from '@nestjs/swagger';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('validate')
  @ApiOperation({summary: 'Check company in DB'})
  @ApiBody({
    description: 'Object with company params',
    type: CompanyDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Company entity',
    type: Company,
  })
  @ApiResponse({
    status: 404,
    description: 'Company does not found',
  })
  public async validate(@Body() company: CompanyDto): Promise<Company> {
    return this.companyService.findCompany(company.company_name);
  }

  @Post('create')
  @ApiOperation({summary: 'Create a new company'})
  @ApiBody({
    description: 'Object with company params',
    type: CompanyDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Company entity',
    type: Company,
  })
  @ApiResponse({
    status: 401,
    description: 'Company name should be unique',
  })
  public async create(@Body() company: CompanyDto): Promise<Company> {
    return this.companyService.createCompany(company.company_name);
  }
}
