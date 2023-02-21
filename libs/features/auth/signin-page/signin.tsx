import {FunctionComponent, useCallback} from 'react';
import {Grid} from '@mui/material';
import {
  SignInForm,
  useSignInApiMutation,
  LoginInterface,
  DASHBOARD_ROOT,
  useTypedTranslation,
  nameSpaces,
} from '@mega-dev-crm/features';
import {useNavigate} from 'react-router-dom';
import {FormHeader} from '@mega-dev-crm/shared';

export const SigninPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const {t} = useTypedTranslation(nameSpaces.auth);
  const [signinApi, {isLoading}] = useSignInApiMutation();
  const handleLoginSubmit = useCallback(async (loginData: LoginInterface) => {
    const data: any = await signinApi(loginData);
    if (!data.error) {
      navigate(DASHBOARD_ROOT);
    }
  }, []);
  return (
    <Grid item md={6}>
      <FormHeader
        title={t('signInPage.title')}
        subTitle={t('signInPage.subtitle')}
      />
      <SignInForm handleLoginSubmit={handleLoginSubmit} isLoading={isLoading} />
    </Grid>
  );
};

export default SigninPage;
