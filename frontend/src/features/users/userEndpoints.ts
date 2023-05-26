import { apiSliceUser } from './apiSliceUser';

export const userEndpoints = apiSliceUser.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (data: { email: string; password: string }) => ({
				url: `/login`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
		register: builder.mutation({
			query: (data: {
				firstName: string;
				lastName: string;
				email: string;
				password: string;
				gender: string;
				hobbies: string[];
				role: 'employee' | 'manager' | '';
			}) => ({
				url: `/register`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = userEndpoints;
