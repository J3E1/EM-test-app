import { apiSliceEmployee } from './apiSliceEmployee';

const empEndpoints = apiSliceEmployee.injectEndpoints({
	endpoints: builder => ({
		getAllEmployees: builder.query({
			query: ({ token }: { token: string }) => ({
				url: '/',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ['Employee'],
		}),
		getEmployee: builder.query({
			query: ({ token, id }: { token: string; id: string }) => ({
				url: `/${id}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ['Employee'],
		}),
	}),
});
export const { useGetAllEmployeesQuery, useGetEmployeeQuery } = empEndpoints;
