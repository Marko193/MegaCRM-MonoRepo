import {FunctionComponent, useCallback} from 'react';
import {Grid} from '@mui/material';
import {
  LoginForm,
  useTypedTranslation,
  nameSpaces,
  useVerifyCompanyApiMutation,
} from '@mega-dev-crm/features';
import {useNavigate} from 'react-router-dom';
import {AUTH_SIGNIN} from 'libs/features/constants';
import {FormHeader} from '@mega-dev-crm/shared';

export interface ILoginFormValue {
  company_name: string;
}

const LoginCompanyPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const {t} = useTypedTranslation(nameSpaces.auth);
  // TODO: Fix isSuccess redirect after fixing bug with company verify
  const [verifyCompanyApi, {isLoading, isSuccess}] =
    useVerifyCompanyApiMutation();
  const handleLoginSubmit = useCallback(async (loginData: ILoginFormValue) => {
    await verifyCompanyApi(loginData);
    if (!isSuccess) {
      navigate(AUTH_SIGNIN);
    }
  }, []);
  return (
    <Grid item md={6}>
      <FormHeader
        title={t('companyPage.title')}
        subTitle={t('companyPage.subtitle')}
      />
      <LoginForm
        isLoading={isLoading}
        handleLoginSubmit={handleLoginSubmit}
        companyInputLabel={t('companyPage.title')}
        submitButtonText={t('buttons.submit', {ns: nameSpaces.common})}
      />
    </Grid>
  );
};

export default LoginCompanyPage;
