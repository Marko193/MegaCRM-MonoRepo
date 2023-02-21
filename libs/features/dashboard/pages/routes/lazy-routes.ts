import {lazy} from 'react';

const VerifyCompanyPage = lazy(
  () => import('../../../auth/login-company-page/login-company')
);

const SignInPage = lazy(() => import('../../../auth/signin-page/signin'));

const SendResetPasswordEmailPage = lazy(
  () => import('../../../auth/forgot-password-page/forgot-password')
);

const ConfirmRestorePasswordPage = lazy(
  () =>
    import(
      '../../../auth/confirm-restore-password-page/confirm-restore-password'
    )
);

const OverviewPage = lazy(() => import('../overview-page/overview'));

export {
  VerifyCompanyPage,
  SignInPage,
  SendResetPasswordEmailPage,
  ConfirmRestorePasswordPage,
  OverviewPage,
};
