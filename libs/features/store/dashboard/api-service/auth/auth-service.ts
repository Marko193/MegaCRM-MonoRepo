import {apiSlice} from '../api-service';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    verifyCompanyApi: build.mutation({
      query: (company_id) => ({
        url: 'company/validate',
        method: 'POST',
        body: {company_id},
      }),
    }),
    signInApi: build.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    resetPasswordEmailSendApi: build.mutation({
      query: (body) => ({
        url: 'employees/send-reset-password-letter',
        method: 'POST',
        body,
      }),
    }),
    setNewPasswordApi: build.mutation({
      query: (body) => ({
        url: 'employees/restore-password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useResetPasswordEmailSendApiMutation,
  useSignInApiMutation,
  useVerifyCompanyApiMutation,
  useSetNewPasswordApiMutation,
} = authApiSlice;
