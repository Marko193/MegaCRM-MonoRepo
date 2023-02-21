import * as yup from 'yup';

export const schema = yup.object().shape({
  password: yup
    .string()
    .required('form.validation.field.required')
    .min(8, 'form.validation.length.must.eight'),
  confirmedPassword: yup
    .string()
    .required('form.validation.field.required')
    .oneOf([yup.ref('password')], 'validation.password.not.match'),
});
