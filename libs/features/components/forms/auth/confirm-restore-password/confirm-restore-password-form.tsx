import {FunctionComponent} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControl, Stack, TextField, Typography} from '@mui/material';
import {schema} from './validation';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {ErrorMessage, FormBodyContainer} from '@mega-dev-crm/shared';
import LoadingButton from '@mui/lab/LoadingButton';

export interface ConfirmRestorePasswordFormValue {
  password: string;
  confirmedPassword: string;
}

export interface ConfirmRestorePasswordFormProps {
  handleSetNewPasswordSubmit: (data: ConfirmRestorePasswordFormValue) => void;
  isLoading: boolean;
  passwordLabel: string;
  confirmPasswordLabel: string;
  submitButtonText: string;
}

export const ConfirmRestorePasswordForm: FunctionComponent<
  ConfirmRestorePasswordFormProps
> = ({
  handleSetNewPasswordSubmit,
  isLoading,
  passwordLabel,
  confirmPasswordLabel,
  submitButtonText,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<ConfirmRestorePasswordFormValue>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {errors} = useFormState({
    control,
  });

  return (
    <form onSubmit={handleSubmit(handleSetNewPasswordSubmit)}>
      <FormBodyContainer>
        <FormControl>
          <TextField
            label={passwordLabel}
            {...register('password')}
            error={!!errors?.password?.message}
            type='password'
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.password?.message)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label={confirmPasswordLabel}
            {...register('confirmedPassword')}
            error={!!errors?.confirmedPassword?.message}
            type='password'
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.confirmedPassword?.message)}
          />
        </FormControl>
        <Stack>
          <LoadingButton
            type='submit'
            disabled={!isValid}
            loading={isLoading}
            sx={{
              textTransform: 'capitalize',
            }}>
            <Typography variant='authButton'>{submitButtonText}</Typography>
          </LoadingButton>
        </Stack>
      </FormBodyContainer>
    </form>
  );
};
