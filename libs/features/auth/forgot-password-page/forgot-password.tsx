import {FunctionComponent, useCallback} from 'react';
import {Grid} from '@mui/material';
import {
  ForgetPasswordForm,
  nameSpaces,
  useTypedTranslation,
  useResetPasswordEmailSendApiMutation,
} from '@mega-dev-crm/features';
import {FormHeader} from '@mega-dev-crm/shared';

export interface IForgotPasswordValue {
  corporate_email: string;
}

export const ForgotPasswordPage: FunctionComponent = () => {
  const {t} = useTypedTranslation(nameSpaces.auth);
  const [resetPasswordEmailSendApi, {isLoading}] =
    useResetPasswordEmailSendApiMutation();
  const handleEmailSubmit = useCallback(
    (companyEmail: IForgotPasswordValue) => {
      resetPasswordEmailSendApi(companyEmail);
    },
    []
  );

  return (
    <Grid item md={6}>
      <FormHeader title={t('form.forgotPassword.forgotPasswordLabel')} />
      <ForgetPasswordForm
        handleEmailSubmit={handleEmailSubmit}
        isLoading={isLoading}
      />
    </Grid>
  );
};

export default ForgotPasswordPage;
