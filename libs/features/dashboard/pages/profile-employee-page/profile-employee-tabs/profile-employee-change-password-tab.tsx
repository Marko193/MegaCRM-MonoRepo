import {FunctionComponent} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {Button, FormControl, Stack, TextField} from '@mui/material';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {ErrorMessage} from '@mega-dev-crm/shared';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';

export interface ChangePasswordFormValue {
  old_email: string;
  new_email: string;
}

export const ChangePasswordForm: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<ChangePasswordFormValue>({
    mode: 'onChange',
  });
  const {errors} = useFormState({
    control,
  });
  const {t} = useTypedTranslation(nameSpaces.common);

  return (
    <Stack width='100%'>
      <form onSubmit={handleSubmit(() => console.log('change'))}>
        <FormControl fullWidth>
          <TextField
            label={t('password.old')}
            {...register('old_email')}
            margin='normal'
            error={!!errors?.old_email?.message}
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.old_email?.message)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={t('password.new')}
            margin='normal'
            error={!!errors?.new_email?.message}
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.new_email?.message)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={t('password.repeat')}
            {...register('new_email')}
            margin='normal'
            error={!!errors?.new_email?.message}
          />
          <ErrorMessage
            message={errorMessageChecker(errors?.new_email?.message)}
          />
        </FormControl>
        <Stack>
          <Button
            type='submit'
            disabled={!isValid}
            fullWidth={true}
            sx={{
              textTransform: 'capitalize',
            }}>
            {t('password.reset')}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
