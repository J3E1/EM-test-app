import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api/auth' });

export const apiSliceUser = createApi({
	reducerPath: 'apiSliceUser',
	baseQuery,
	tagTypes: ['User'],
	endpoints: builder => ({}),
});
