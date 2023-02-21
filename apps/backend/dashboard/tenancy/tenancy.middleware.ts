import {HttpException, HttpStatus} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {DataSource} from 'typeorm';
import {connectionOptions} from '../config/tenancy-db-config';

const company_header = 'company_id';

export async function companyMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const header = req.headers[company_header] as string;
    req.companyId = header?.toString() || null;
    if (header === undefined || req.companyId.length !== 36)
      throw new HttpException(
        'Company was not provided',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    const db = new DataSource(connectionOptions(`public`));
    await db.initialize();

    const schema = await db.query(
      `SELECT company_id FROM company
      WHERE company_id='${req.companyId}'`
    );
    if (!schema.length) {
      throw new HttpException(
        'Company id does not correct',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}
