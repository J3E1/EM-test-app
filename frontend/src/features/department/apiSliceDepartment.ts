import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api/departments' });

export const apiSliceDepartment = createApi({
	reducerPath: 'apiSLiceDepartment',
	baseQuery,
	tagTypes: ['Department'],
	endpoints: builder => ({}),
});
