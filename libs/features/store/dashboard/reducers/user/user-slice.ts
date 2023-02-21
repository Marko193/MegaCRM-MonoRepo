import {createSlice} from '@reduxjs/toolkit';
import {authApiSlice} from '../../api-service';

import {toast} from 'react-toastify';

interface UserInterface {
  id: number | null;
  name: string;
  email: string;
}

interface UserState {
  user: UserInterface;
  companyId: string | null;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  user: {
    id: null,
    name: '',
    email: '',
  },
  companyId: null,
  error: null,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    checkCompanyId: (state, action) => {
      state.companyId = action.payload;
    },
    updateRefreshToken: (state, {payload}) => {
      (state.accessToken = payload.accessToken),
        (state.refreshToken = payload.refreshToken);
    },
    logout: (state) => {
      (state.accessToken = null),
        (state.accessToken = null),
        (state.companyId = null);
    },
  },
  extraReducers: (build) => {
    build.addMatcher(
      authApiSlice.endpoints.verifyCompanyApi.matchFulfilled,
      (state, {payload}) => {
        state.companyId = payload.company_id;
        state.error = null;
      }
    ),
      build.addMatcher(
        authApiSlice.endpoints.verifyCompanyApi.matchRejected,
        (state, {payload}: any) => {
          toast.error(payload.data.message);
          state.companyId = null;
          state.error = null;
        }
      );
    build.addMatcher(
      authApiSlice.endpoints.signInApi.matchFulfilled,
      (state, {payload}) => {
        console.log('payload', payload);
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.user = payload.user;
      }
    ),
      build.addMatcher(
        authApiSlice.endpoints.signInApi.matchRejected,
        (state, {payload}: any) => {
          state.error = payload.data.error;
          state.accessToken = null;
          state.refreshToken = null;
          toast.error(payload.data.message);
        }
      );
    build.addMatcher(
      authApiSlice.endpoints.resetPasswordEmailSendApi.matchRejected,
      (state, {payload}: any) => {
        state.error = payload.data.error;
        toast.error(payload.data.message);
      }
    );
    build.addMatcher(
      authApiSlice.endpoints.setNewPasswordApi.matchRejected,
      (state, {payload}: any) => {
        state.error = payload.data.error;
        toast.error(payload.data.message);
      }
    );
  },
});

export const {updateRefreshToken, logout} = userSlice.actions;
export default userSlice.reducer;
