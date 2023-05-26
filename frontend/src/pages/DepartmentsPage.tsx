import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Table from '../components/Table';
import { useGetAllDepartmentsQuery } from '../features/department/departmentEndPoints';
import { setDepartments } from '../features/department/departmentSlice';
import SideBar from '../components/SideBar';

type Props = {};
export default function DepartmentsPage({}: Props) {
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector(state => state.auth);
	const { departments, currentPage } = useAppSelector(
		state => state.department
	);
	const { data, isFetching } = useGetAllDepartmentsQuery({
		token: userInfo!.token,
		page: currentPage,
	});
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				data && dispatch(setDepartments(data.departments));
			} catch (err) {
				console.log('🚀 ~ file: HomePage.tsx:36 ~ submitHandler ~ err:', err);
			}
		};
		fetchEvents();
	}, [dispatch, data]);
	if (isFetching || !departments)
		return <h1 className='text-center'>Loading</h1>;
	return (
		<div>
			<Table departments={departments} />
			<SideBar />
		</div>
	);
}
