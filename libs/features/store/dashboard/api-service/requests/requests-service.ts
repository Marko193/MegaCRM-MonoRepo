import {apiSlice} from '../api-service';

export const requestsSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProcessingRequestsApi: build.query({
      query: () => ({
        url: 'calendar-requests/request-status/processing',
      }),
    }),
  }),
});

export const {useGetAllProcessingRequestsApiQuery} = requestsSliceApi;
