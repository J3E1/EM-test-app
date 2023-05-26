import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/Layout';
import { useGetEmployeeQuery } from '../features/employee/employeeEndpoints';
import { setCurrentEmployee } from '../features/employee/employeeSlice';

type Props = {};
export default function HomePage({}: Props) {
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector(state => state.auth);
	const { currentEmployee: user } = useAppSelector(state => state.employee);
	const { data, isFetching } = useGetEmployeeQuery({
		token: userInfo!.token,
		id: userInfo!.userId,
	});
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				data && dispatch(setCurrentEmployee(data.employee));
			} catch (err) {
				console.log('🚀 ~ file: HomePage.tsx:36 ~ submitHandler ~ err:', err);
			}
		};
		fetchEvents();
	}, [dispatch, data]);

	if (isFetching || user === null)
		return <h1 className='text-center'>Loading</h1>;
	return (
		<Layout>
			<div className='w-full mx-auto text-center my-8'>
				<h3 className='text-2xl font-semibold mb-2'>
					{user.firstName} {user.lastName}
				</h3>
				<h4 className='text-xl font-semibold text-gray-500 mb-2'>
					{user.email}
				</h4>
				<h5 className='text-xl text-gray-700 uppercase mb-8'>{user.role}</h5>
				{user.role === 'employee' && user.department?.length === 0 ? (
					<p className='font-semibold text-xl underline'>
						You are not a part of any department yet!
					</p>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						{user.department?.map(dep => (
							<Department key={dep._id} department={dep} />
						))}
					</div>
				)}
			</div>
		</Layout>
	);
}
function Department({
	department,
}: {
	department: {
		_id: string;
		departmentName: string;
		categoryName: string;
		location: string;
		salary: number;
	};
}) {
	return (
		<div className='w-full mx-auto bg-white '>
			<div className='text-gray-500 text-start py-6 px-4 space-y-3 mx-6 shadow-lg rounded-sm border border-gray-200'>
				<div className='w-full flex gap-4'>
					<div className='text-black leading-6 font-bold w-[35%] '>
						<h5>Department:</h5>
					</div>
					<div className='leading-6 font-semibold w-[65%]'>
						<p>{department.departmentName}</p>
					</div>
				</div>
				<div className='w-full flex gap-4'>
					<div className='text-black leading-6 font-bold w-[35%] '>
						<h5>Category:</h5>
					</div>
					<div className='leading-6 font-semibold w-[65%]'>
						<p>{department.categoryName}</p>
					</div>
				</div>
				<div className='w-full flex gap-4'>
					<div className='text-black leading-6 font-bold w-[35%] '>
						<h5>Location:</h5>
					</div>
					<div className='leading-6 font-semibold w-[65%]'>
						<p>{department.location}</p>
					</div>
				</div>
				<div className='w-full flex gap-4'>
					<div className='text-black leading-6 font-bold w-[35%] '>
						<h5>Salary:</h5>
					</div>
					<div className='leading-6 font-semibold w-[65%]'>
						<p>{department.salary}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
