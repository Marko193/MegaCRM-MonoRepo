import {Global, Module, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Request as ExpressRequest} from 'express';
import {DataSource} from 'typeorm';
import {connectionOptions} from '../config/tenancy-db-config';
import {CONNECTION} from './tenancy.symbols';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const {companyId} = request;
    if (companyId) {
      return new DataSource(
        connectionOptions(`company_${companyId}`)
      ).initialize();
    }
    return null;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
