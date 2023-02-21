import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';

import {apiSlice} from '../api-service';

const employeeAdapter = createEntityAdapter();

const initialState = employeeAdapter.getInitialState();

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchAllEmployees: build.query({
      query: () => ({
        url: 'employees',
      }),
      transformResponse: (response: any) =>
        employeeAdapter.setAll(initialState, response),
      providesTags: ['Employees'],
    }),
  }),
});

export const {useFetchAllEmployeesQuery} = employeeApiSlice;

export const selectAllEmployees =
  employeeApiSlice.endpoints.fetchAllEmployees.select(undefined);

export const selectSortedWithChild = createSelector(
  [selectAllEmployees],
  (employees) => employees.data
);

export const {selectAll: getAllEmployees} = employeeAdapter.getSelectors(
  (state: any) => selectSortedWithChild(state) ?? initialState
);
