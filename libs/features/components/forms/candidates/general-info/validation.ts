import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Field is required'),
  surname: yup.string().required('Field is required'),
  expected_payment_level: yup.string().required('Field is required'),
});
