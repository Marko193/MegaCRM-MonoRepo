/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {FunctionComponent} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControl, TextField, Typography} from '@mui/material';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {ErrorMessage, FormBodyContainer} from '@mega-dev-crm/shared';
import {schema} from './validation';
import LoadingButton from '@mui/lab/LoadingButton';

export interface LoginFormProps {
  handleLoginSubmit: (data: LoginFormValue) => void;
  companyInputLabel?: string;
  submitButtonText: string;
  isLoading: boolean;
}

export interface LoginFormValue {
  company_name: string;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({
  handleLoginSubmit,
  companyInputLabel,
  submitButtonText,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<LoginFormValue>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {errors} = useFormState({
    control,
  });
  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <FormBodyContainer>
        <FormControl>
          <TextField
            label={companyInputLabel}
            {...register('company_name')}
            error={!!errors?.company_name?.message}
            data-testid='companyID-input'
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.company_name?.message)}
          />
        </FormControl>
        <LoadingButton
          type='submit'
          disabled={!isValid}
          loading={isLoading}
          data-testid='submit-button'
          sx={{
            textTransform: 'capitalize',
          }}>
          <Typography variant='authButton'>{submitButtonText}</Typography>
        </LoadingButton>
      </FormBodyContainer>
    </form>
  );
};
