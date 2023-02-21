/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState, updateRefreshToken} from '@mega-dev-crm/features';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';
import axios from 'axios';

const mutex = new Mutex();
const BASE_URL = 'https://v2-dev.mega-hub.io/api/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers, {getState}) => {
    console.log(getState());
    const companyId: any = (getState() as RootState).userReducer.companyId;
    const token = (getState() as RootState).userReducer.accessToken;

    headers.set('Authorization', `Bearer ${token}`);
    headers.set('company_id', companyId);

    return headers;
  },
});

const refreshToken = async (state: RootState) => {
  return await axios.post(
    `${BASE_URL}/auth/refresh`,
    {body: {refreshAccessToken: state.userReducer.refreshToken}},
    {
      headers: {
        authorization: `Bearer ${state.userReducer.refreshToken}`,
        company_id: state.userReducer.companyId,
      },
    }
  );
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // if (result.data) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const state = api.getState() as RootState;
      try {
        const refreshResult = await refreshToken(state);
        console.log('REFRESH', refreshResult);
        if (refreshResult.data) {
          console.log('here');
          api.dispatch(updateRefreshToken(refreshResult));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log('logout');
          // api.dispatch(logout());

          // location.reload();
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employees', 'Members'],
  endpoints: (builder) => ({}),
});
