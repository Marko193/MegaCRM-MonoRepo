import {FunctionComponent} from 'react';
import {Grid} from '@mui/material';
import {
  AUTH_SIGNIN,
  ConfirmRestorePasswordForm,
  nameSpaces,
  useSetNewPasswordApiMutation,
  useTypedTranslation,
} from '@mega-dev-crm/features';
import {useNavigate, useParams} from 'react-router-dom';
import {FormHeader} from '@mega-dev-crm/shared';

export interface ConfirmRestorePasswordPageProps {
  title?: string;
}

const ConfirmRestorePasswordPage: FunctionComponent<
  ConfirmRestorePasswordPageProps
> = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {t} = useTypedTranslation(nameSpaces.common);
  const [setNewPasswordApi, {isLoading}] = useSetNewPasswordApiMutation();

  const handleSetNewPasswordSubmit = async (data: any) => {
    const results: any = await setNewPasswordApi({
      ...data,
      jwtRestorePasswordToken: id,
    });
    if (!results.error) {
      navigate(AUTH_SIGNIN);
    }
  };

  return (
    <Grid item md={6}>
      <FormHeader
        title={t('form.confirmPassword.confirmPasswordLabel', {
          ns: nameSpaces.auth,
        })}
      />
      <ConfirmRestorePasswordForm
        handleSetNewPasswordSubmit={handleSetNewPasswordSubmit}
        isLoading={isLoading}
        passwordLabel={t('password.new')}
        confirmPasswordLabel={t('password.repeat')}
        submitButtonText={t('buttons.update', {ns: nameSpaces.common})}
      />
    </Grid>
  );
};

export default ConfirmRestorePasswordPage;
