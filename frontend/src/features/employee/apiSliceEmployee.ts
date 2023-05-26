import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api/employees' });

export const apiSliceEmployee = createApi({
	reducerPath: 'apiSliceEmployee',
	baseQuery,
	tagTypes: ['Employee'],
	endpoints: builder => ({}),
});
