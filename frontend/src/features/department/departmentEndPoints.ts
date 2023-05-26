import { apiSliceDepartment } from './apiSliceDepartment';

export const depEndpoints = apiSliceDepartment.injectEndpoints({
	endpoints: builder => ({
		getAllDepartments: builder.query({
			query: ({ token, page = 1 }: { token: string; page?: number }) => ({
				url: `/?page=${page}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ['Department'],
		}),
		createDepartment: builder.mutation({
			query: ({
				data,
				token,
			}: {
				data: Partial<Department>;
				token: string;
			}) => ({
				url: `/`,
				method: 'POST',
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ['Department'],
		}),
		getDepartment: builder.query({
			query: ({ depId, token }: { depId: string; token: string }) => ({
				url: `/${depId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ['Department'],
		}),
		updateDepartment: builder.mutation({
			query: ({
				depId,
				data,
				token,
			}: {
				depId: string;
				data: Partial<Department>;
				token: string;
			}) => ({
				url: `/${depId}`,
				method: 'PATCH',
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ['Department'],
		}),
		deleteDepartment: builder.mutation({
			query: ({ depId, token }: { depId: string; token: string }) => ({
				url: `/${depId}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ['Department'],
		}),
	}),
});

export const {
	useCreateDepartmentMutation,
	useDeleteDepartmentMutation,
	useUpdateDepartmentMutation,
	useGetAllDepartmentsQuery,
	useGetDepartmentQuery,
	useLazyGetAllDepartmentsQuery,
} = depEndpoints;
