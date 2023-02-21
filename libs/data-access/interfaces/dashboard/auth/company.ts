export interface VerifyCompanyInterface {
  company_name: string;
}

export interface VerifyCompanySuccessResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  company_id: string;
  status: boolean;
  company_name: string;
}

export interface VerifyCompanyErrorResponse {
  statusCode: number;
  message: string;
}
