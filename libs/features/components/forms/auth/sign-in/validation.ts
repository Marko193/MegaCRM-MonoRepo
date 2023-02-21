import * as yup from 'yup';

export const schema = yup.object().shape({
  corporate_email: yup
    .string()
    .email('form.validation.must.be.valid.email')
    .required('form.validation.field.required'),
  password: yup
    .string()
    .min(4, 'form.validation.length.must.eight')
    .max(32)
    .required('form.validation.field.required'),
});
