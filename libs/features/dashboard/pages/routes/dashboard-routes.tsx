import {Suspense} from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {AuthLayout} from 'libs/features/layouts/auth/auth-layouts';
import {MainLayout} from 'libs/features/layouts/main/layouts';
import {
  SendResetPasswordEmailPage,
  SignInPage,
  VerifyCompanyPage,
  ConfirmRestorePasswordPage,
  OverviewPage,
} from './lazy-routes';

export const route = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'company',
        element: (
          <Suspense>
            <VerifyCompanyPage />
          </Suspense>
        ),
      },
      {
        path: 'signin',
        element: (
          <Suspense>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense>
            <SendResetPasswordEmailPage />
          </Suspense>
        ),
      },
      {
        path: 'restore-password/:id',
        element: (
          <Suspense>
            <ConfirmRestorePasswordPage title='restore' />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout config={[]} />,

    children: [
      {
        path: '/',
        element: (
          <Suspense>
            <OverviewPage />
          </Suspense>
        ),
      },
    ],
  },
]);
// import {AuthLayout} from '@mega-dev-crm/features';
// import {menuItems} from './sidebarConfig';
// import {Navigate, useRoutes} from 'react-router-dom';

// import {
//   Navigate,
//   Route,
// } from '@tanstack/react-location';
// import {AuthLayout} from 'libs/features/layouts/auth/auth-layouts';
// import {MainLayout} from 'libs/features/layouts/main/layouts';
//
// export const routes: Route[] = [
//   {
//     path: '/da',
//     element: <MainLayout config={[]} />,
//     children: [
//       {path: '/overview', element: <h1>Overview</h1>},
//       {
//         path: '/test',
//         element: <Navigate to='dashboard' replace />,
//       },
//     ],
//   },
//   {
//     path: 'auth',
//     element: <AuthLayout />,
//     children: [
//       {
//         path: 'company',
//         element: () =>
//           import('libs/features/auth/login-company-page/login-company').then(
//             (module) => <module.default />
//           ),
//       },
//       {
//         path: 'signin',
//         element: () =>
//           import('libs/features/auth/signin-page/signin').then((module) => (
//             <module.default />
//           )),
//       },
//       {
//         path: 'restore-password',
//         children: [
//           {
//             path: '/',
//             element: () =>
//               import(
//                 'libs/features/auth/forgot-password-page/forgot-password'
//               ).then((module) => <module.default />),
//           },
//           {
//             path: ':token',
//             element: () =>
//               import(
//                 'libs/features/auth/confirm-restore-password-page/confirm-restore-password'
//               ).then((module) => <module.default title={'lol'} />),
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <h1>404</h1>,
//   },
// ];
//
