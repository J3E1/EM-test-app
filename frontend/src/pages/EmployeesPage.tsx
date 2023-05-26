import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/Layout';
import { useGetAllEmployeesQuery } from '../features/employee/employeeEndpoints';
import { useState, useEffect } from 'react';
import { setEmployees } from '../features/employee/employeeSlice';
type Props = {};
export default function EmployeesPage({}: Props) {
	const { employees } = useAppSelector(state => state.employee);
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector(state => state.auth);
	const { data, isFetching } = useGetAllEmployeesQuery({
		token: userInfo!.token,
	});
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				data && dispatch(setEmployees(data.employees));
			} catch (err) {
				console.log('🚀 ~ file: HomePage.tsx:36 ~ submitHandler ~ err:', err);
			}
		};
		fetchEvents();
	}, [dispatch, data]);
	if (isFetching || !employees) return <h1 className='text-center'>Loading</h1>;

	return (
		<Layout>
			<header className='px-5 py-4 border-b border-gray-100'>
				<div className='flex justify-between items-center'>
					<h2 className='font-semibold text-gray-800 text-xl'>Employees</h2>
				</div>
			</header>
			<div className='p-3'>
				<div className='overflow-x-auto'>
					<table className='table-auto w-full'>
						<thead className='text-sm font-semibold uppercase text-gray-400 bg-gray-50'>
							<tr>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-left'>First Name</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-left'>Last Name</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-left'>Email</div>
								</th>
							</tr>
						</thead>
						<tbody className='text-md divide-y divide-gray-100'>
							{employees!.map(employee => (
								<TableRow key={employee._id} employee={employee} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
}
function TableRow({ employee }: { employee: Employee }) {
	return (
		<tr>
			<td className='p-2 whitespace-nowrap'>
				<div className='font-medium text-gray-500'>
					<div className=''>{employee.firstName}</div>
				</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='font-medium text-gray-500'>
					<div className=''>{employee.lastName}</div>
				</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='font-medium text-gray-500'>
					<div className=''>{employee.email}</div>
				</div>
			</td>
		</tr>
	);
}
