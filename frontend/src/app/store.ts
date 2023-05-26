import { configureStore } from '@reduxjs/toolkit';
import { apiSliceUser } from '../features/users/apiSliceUser';
import { apiSliceEmployee } from '../features/employee/apiSliceEmployee';
import { apiSliceDepartment } from '../features/department/apiSliceDepartment';
import authReducer from '../features/users/authSlice';
import employeeReducer from '../features/employee/employeeSlice';
import sideBarReducer from '../features/sideBar/sideBarSlice';
import departmentReducer from '../features/department/departmentSlice';

const store = configureStore({
	reducer: {
		[apiSliceUser.reducerPath]: apiSliceUser.reducer,
		[apiSliceEmployee.reducerPath]: apiSliceEmployee.reducer,
		[apiSliceDepartment.reducerPath]: apiSliceDepartment.reducer,
		auth: authReducer,
		employee: employeeReducer,
		department: departmentReducer,
		sidebar: sideBarReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			apiSliceUser.middleware,
			apiSliceEmployee.middleware,
			apiSliceDepartment.middleware,
		]),
	devTools: true,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
