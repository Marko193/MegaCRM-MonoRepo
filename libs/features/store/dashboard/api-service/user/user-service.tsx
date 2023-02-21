import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://v2-dev.mega-hub.io/api'}),
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: '/users',
      }),
    }),
    verifyCompany: build.mutation({
      query: (body) => ({
        url: '/company/validate',
        method: 'POST',
        body,
      }),
    }),
  }),
});
