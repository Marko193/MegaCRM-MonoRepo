import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsInt, IsOptional} from '@nestjs/class-validator';
import {Order} from '../enums';
import {HelperFunctions} from '../constants';

export class PageOptionsDto {
  @ApiPropertyOptional({enum: Order, default: Order.ASC})
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({type: 'number'})
  @IsOptional()
  @IsInt()
  readonly page?: number = 1;

  @ApiPropertyOptional({type: 'number'})
  @IsInt()
  @IsOptional()
  readonly limit?: number = 6;

  checkQueryParamsFunction(pageOptions: PageOptionsDto) {
    const actualPageNumber = HelperFunctions.checkIfQueryParamCorrect(
      this.page,
      pageOptions.page
    );

    const actualPageLimit = HelperFunctions.checkIfQueryParamCorrect(
      this.limit,
      pageOptions.limit
    );

    const actualOrder = HelperFunctions.checkIfValueIncludesInEnum(
      this.order,
      pageOptions.order,
      Order
    );

    return {
      page: actualPageNumber,
      limit: actualPageLimit,
      order: actualOrder,
    };
  }

  skip(queryPageNumber, queryPageLimit): number {
    return (queryPageNumber - 1) * queryPageLimit;
  }
}
