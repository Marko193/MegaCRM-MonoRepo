import {FunctionComponent} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControl, TextField, Typography} from '@mui/material';
import {schema} from './validation';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {ErrorMessage, FormBodyContainer} from '@mega-dev-crm/shared';
import {useTypedTranslation} from 'libs/features/hooks';
import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
import LoadingButton from '@mui/lab/LoadingButton';

export interface ForgotPasswordFormValue {
  corporate_email: string;
}

export interface ForgotPasswordFormProps {
  handleEmailSubmit: (data: ForgotPasswordFormValue) => void;
  isLoading: boolean;
}

export const ForgetPasswordForm: FunctionComponent<ForgotPasswordFormProps> = ({
  handleEmailSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<ForgotPasswordFormValue>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {errors} = useFormState({
    control,
  });
  const {t} = useTypedTranslation(nameSpaces.auth);

  return (
    <form onSubmit={handleSubmit(handleEmailSubmit)}>
      <FormBodyContainer>
        <FormControl>
          <TextField
            label={t('form.forgotPassword.email')}
            {...register('corporate_email')}
            error={!!errors?.corporate_email?.message}
            data-testid='forgot-email-input'
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.corporate_email?.message)}
          />
        </FormControl>
        <LoadingButton
          type='submit'
          disabled={!isValid}
          data-testid='submit-button'
          loading={isLoading}
          sx={{
            textTransform: 'capitalize',
          }}>
          <Typography variant='authButton'>
            {t('password.reset', {ns: nameSpaces.common})}
          </Typography>
        </LoadingButton>
      </FormBodyContainer>
    </form>
  );
};
