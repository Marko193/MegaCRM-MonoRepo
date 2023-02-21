import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Field is required'),
  surname: yup.string().required('Field is required'),
  inn: yup
    .string()
    .matches(/^\d+$/, 'The field should have digits only')
    .min(4, 'Min length 4')
    .required('Field is required'),
  date_of_birth: yup.string().required('Field is required'),
});
