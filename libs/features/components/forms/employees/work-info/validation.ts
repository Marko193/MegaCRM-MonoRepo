import * as yup from 'yup';

export const schema = yup.object().shape({
  user_position: yup.string().required('Field is required'),
  format_of_work: yup.string().required('Field is required'),
  user_status: yup.string().required('Field is required'),
  assigneHR: yup.string().required('Field is required'),
  salary: yup
    .string()
    .matches(/^\d+$/, 'The field should have digits only')
    .required('Field is required'),
});
