import {MouseEvent, FunctionComponent, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  TextField,
  InputAdornment,
  FormControl,
  Typography,
  useTheme,
  Stack,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {schema} from './validation';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {ErrorMessage, FormBodyContainer} from '@mega-dev-crm/shared';
import {useTypedTranslation} from 'libs/features/hooks';
import {nameSpaces} from '@mega-dev-crm/features';

export interface LoginInterface {
  corporate_email: string;
  password: string;
}

interface SignInFormProps {
  handleLoginSubmit: (data: any) => void;
  isLoading: boolean;
}

export const SignInForm: FunctionComponent<SignInFormProps> = ({
  handleLoginSubmit,
  isLoading,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {t} = useTypedTranslation(nameSpaces.auth);
  const {spacing} = useTheme();

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<LoginInterface>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => {
    setIsVisible(!isVisible);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <FormBodyContainer>
        <FormControl>
          <TextField
            data-testid='email-input'
            id='outlined-basic'
            label={t('form.emailLabel')}
            error={!!errors.corporate_email}
            {...register('corporate_email')}
          />
          <ErrorMessage
            message={errorMessageChecker(errors.corporate_email?.message)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='outlined-adornment-password'>
            {t('form.passwordLabel')}
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={isVisible ? 'text' : 'password'}
            data-testid='password-input'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'>
                  {isVisible ? (
                    <VisibilityOff color='warning' />
                  ) : (
                    <Visibility color='warning' />
                  )}
                </IconButton>
              </InputAdornment>
            }
            {...register('password')}
            error={!!errors.password}
            label={t('form.passwordLabel')}
          />
          <ErrorMessage
            message={errorMessageChecker(errors.password?.message)}
          />
        </FormControl>
        <Stack pb={spacing(2)}>
          <Typography variant='authLink' color='common.default' align='right'>
            <Link to={'/auth/forgot-password'}>
              {t('form.signIn.forgotPassword')}
            </Link>
          </Typography>
        </Stack>
        <LoadingButton
          fullWidth
          data-testid='submit-button'
          type='submit'
          disabled={!isValid}
          loading={isLoading}
          sx={{
            textTransform: 'capitalize',
          }}>
          <Typography variant='authButton'>
            {t('buttons.login', {ns: nameSpaces.common})}
          </Typography>
        </LoadingButton>
      </FormBodyContainer>
    </form>
  );
};
