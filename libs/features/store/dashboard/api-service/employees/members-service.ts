import {createEntityAdapter} from '@reduxjs/toolkit';
import _ from 'lodash';

import {apiSlice} from '../api-service';

const membersAdapter = createEntityAdapter();

const initialState = membersAdapter.getInitialState();

export const membersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchEmployeeMembers: build.query({
      query: (member) => ({
        url: `family-members/${member}`,
      }),
      transformResponse: (response: any) =>
        membersAdapter.setAll(initialState, response),
      providesTags: ['Employees'],
    }),
  }),
});

export const {useFetchEmployeeMembersQuery} = membersApiSlice;

export const {
  selectAll: selectAllMembers,
  selectIds,
  selectEntities,
  selectById,
} = membersAdapter.getSelectors((state: any) => state ?? initialState);
