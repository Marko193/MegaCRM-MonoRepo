import * as yup from 'yup';
export const schema = yup
  .object()
  .shape({
    corporate_email: yup
      .string()
      .email('form.validation.wrong.email.format')
      .required('form.validation.field.required'),
  })
  .required();
