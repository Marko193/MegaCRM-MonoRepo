export interface Data {
  generalInfo: GeneralInfo;
  workInfo: WorkInfo;
  contacts: Contacts;
}

export interface GeneralInfo {
  name: string;
  surname: string;
  date_of_birth: any;
  inn: string;
  country: string;
  city: string;
  sex: string;
  merchant_size: string;
}

export interface WorkInfo {
  user_position: string;
  user_level: string;
  format_of_work: string;
  user_status: string;
  technologies: string[];
  assigneHR: string;
  assigneSales: string;
  assignePM: string;
  role_id: string;
  employee_start_date: any;
  employee_end_date: any;
  is_probation_period: boolean;
  salary: string;
}

export interface Contacts {
  main_phone: string;
  additional_phone: string;
  personal_email: string;
  corporate_email: string;
  skype: string;
  telegram: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface EmployeeContextValue {
  value: Data | null;
  setValue: any;
}
