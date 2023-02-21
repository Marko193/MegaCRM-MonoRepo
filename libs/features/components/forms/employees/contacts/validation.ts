import * as yup from 'yup';

export const schema = yup.object().shape({
  main_phone: yup.string().required('Field is required'),
  corporate_email: yup
    .string()
    .email('Must be a valid value')
    .required('Field is required'),
  personal_email: yup.string().email('Must be a valid value'),
});
