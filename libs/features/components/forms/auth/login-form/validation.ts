import * as yup from 'yup';

// const DomainRegEx = /^([\wёa-я-]{2,}\.)+[\wёa-я-]{2,}$/i;
export const schema = yup
  .object()
  .shape({
    company_name: yup.string().required('validation.company.required'),
    // .matches(DomainRegEx, 'wrong.domain.format'),
  })
  .required();
