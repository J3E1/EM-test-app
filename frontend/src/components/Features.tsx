import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ChangeEvent, useEffect, useState } from 'react';

import Select from 'react-select';

import Input from './Input';
import { MultiValue } from 'react-select';
import { useGetAllEmployeesQuery } from '../features/employee/employeeEndpoints';
import { setEmployees } from '../features/employee/employeeSlice';
import {
	useCreateDepartmentMutation,
	useUpdateDepartmentMutation,
} from '../features/department/departmentEndPoints';
import { categoryName, departmentName, locations } from '../data/Departments';
import { closeSidebar } from '../features/sideBar/sideBarSlice';
import errorExtractor from '../utils/errorExtractor';

export default function Features() {
	const { currentDepartment } = useAppSelector(state => state.department);
	const { mode } = useAppSelector(state => state.sidebar);
	const { userInfo } = useAppSelector(state => state.auth);
	const { employees } = useAppSelector(state => state.employee);
	const dispatch = useAppDispatch();
	const [department, setDepartment] = useState(
		currentDepartment || {
			_id: '',
			departmentName: '',
			categoryName: '',
			location: '',
			salary: '',
			employees: [],
		}
	);

	const { data, isFetching: fetchingEmployees } = useGetAllEmployeesQuery({
		token: userInfo!.token,
	});
	useEffect(() => {
		if (!fetchingEmployees && data?.employees?.length !== 0) {
			dispatch(setEmployees(data.employees));
		}
	}, [data?.employees, dispatch, fetchingEmployees]);

	const [createDepartment] = useCreateDepartmentMutation();
	const [updateDepartment] = useUpdateDepartmentMutation();
	const [emplArr, setEmplArr] = useState<{ _id: string; email: string }[]>([]);
	const handleEmployeeChange = (
		selectedOptions: MultiValue<{
			value: string;
			label: string;
		}>
	) => {
		const updatedEmployees = selectedOptions.map(option => ({
			_id: option.value as string,
			email: option.label as string,
		}));

		setEmplArr(updatedEmployees);
	};
	const [editMode, setEditMode] = useState(
		mode === 'CREATE' || mode === 'EDIT'
	);
	useEffect(() => {
		if (mode === 'CREATE') {
			setDepartment({
				_id: '',
				departmentName: '',
				categoryName: '',
				location: '',
				salary: '',
				employees: [],
			});
			setEmplArr([]);
			setEditMode(true);
		}
		if (mode === 'INFO') {
			setDepartment(currentDepartment!);
			setEditMode(false);
		}
		if (mode === 'EDIT') {
			setDepartment(currentDepartment!);

			setEmplArr(
				currentDepartment!.employees!.map(employee =>
					typeof employee !== 'string'
						? {
								_id: employee._id,
								email: employee.email,
						  }
						: { _id: '', email: '' }
				)
			);
			setEditMode(true);
		}
	}, [mode, currentDepartment]);

	const handleSubmit = async () => {
		const data = {
			departmentName: department.departmentName,
			categoryName: department.categoryName,
			location: department.location,
			salary: +department.salary,
			employees: emplArr.map(emp => emp._id),
		};
		try {
			if (mode === 'CREATE') {
				const res = await createDepartment({
					data,
					token: userInfo?.token as string,
				}).unwrap();
				console.log('🚀 ~ ', res);
				// toast.success('Event created successfully');
			}
			if (mode === 'EDIT') {
				const res = await updateDepartment({
					depId: department._id,
					data,
					token: userInfo?.token as string,
				}).unwrap();
				console.log('🚀 ~ ', res);
				// toast.success('Event updated successfully');
			}
			dispatch(closeSidebar());
		} catch (err) {
			console.log(
				'🚀 ~ file: Features.tsx:65 ~ createEventHandler ~ err:',
				err
			);
			errorExtractor(err);
		}
	};
	if (fetchingEmployees) return <h1>Loading</h1>;

	const depOptions = departmentName.map(department => ({
		value: department,
		label: department,
	}));
	const catOptions = categoryName.map(cat => ({
		value: cat,
		label: cat,
	}));
	const locOptions = locations.map(loc => ({
		value: loc,
		label: loc,
	}));

	const options = employees?.map(employee => ({
		value: employee._id,
		label: employee.email,
	}));

	return (
		<>
			<div className='w-[90%] rounded overflow-hidden mx-auto h-full my-10'>
				<section className='my-8'>
					<ul className='space-y-5'>
						<li className='flex w-full items-center gap-4'>
							<div className='text-black leading-6 font-bold w-[30%] my-auto'>
								<h5>Department Name:</h5>
							</div>
							<div className='leading-6 font-semibold text-gray-500 w-[70%]'>
								{editMode ? (
									<Select
										required
										placeholder='Select Department'
										theme={theme => ({
											...theme,
											borderRadius: 0,
											colors: {
												...theme.colors,
												primary25: 'black',
												primary: 'black',
											},
										})}
										options={depOptions}
										onChange={e =>
											setDepartment(prev => ({
												...prev,
												departmentName: e?.value ?? '',
											}))
										}
										value={depOptions.filter(
											option => option.label === department.departmentName
										)}
									/>
								) : (
									<p>{department.departmentName}</p>
								)}
							</div>
						</li>
						<li className='flex w-full items-center gap-4'>
							<div className='text-black leading-6 font-bold w-[30%] my-auto'>
								<h5>Category Name:</h5>
							</div>
							<div className='leading-6 font-semibold text-gray-500 w-[70%]'>
								{editMode ? (
									<Select
										required
										placeholder='Select Category'
										theme={theme => ({
											...theme,
											borderRadius: 0,
											colors: {
												...theme.colors,
												primary25: 'black',
												primary: 'black',
											},
										})}
										options={catOptions}
										onChange={e =>
											setDepartment(prev => ({
												...prev,
												categoryName: e?.value ?? '',
											}))
										}
										value={catOptions.filter(
											option => option.label === department.categoryName
										)}
									/>
								) : (
									<p>{department.categoryName}</p>
								)}
							</div>
						</li>
						<li className='flex w-full items-center gap-4'>
							<div className='text-black leading-6 font-bold w-[30%] my-auto'>
								<h5>Location:</h5>
							</div>
							<div className='leading-6 font-semibold text-gray-500 w-[70%]'>
								{editMode ? (
									<Select
										required
										placeholder='Select Location'
										theme={theme => ({
											...theme,
											borderRadius: 0,
											colors: {
												...theme.colors,
												primary25: 'black',
												primary: 'black',
											},
										})}
										options={locOptions}
										onChange={e =>
											setDepartment(prev => ({
												...prev,
												location: e?.value ?? '',
											}))
										}
										value={locOptions.filter(
											option => option.label === department.location
										)}
									/>
								) : (
									<p>{department.location}</p>
								)}
							</div>
						</li>

						<li className='flex w-full items-center gap-4'>
							<div className='text-black leading-6 font-bold w-[30%] my-auto'>
								<h5>Salary:</h5>
							</div>
							<div className='leading-6 font-semibold text-gray-500 w-[70%]'>
								{editMode ? (
									<input
										required
										onChange={e =>
											setDepartment(prev => ({
												...prev,
												salary: +e.target.value,
											}))
										}
										type='text'
										className='h-10 text-black border border-gray-light rounded-sm w-full py-2 px-3 leading-tight focus:outline-none focus:bg-primary-light'
										placeholder='Enter Salary'
										value={department.salary}
									/>
								) : (
									<p>{department.salary}</p>
								)}
							</div>
						</li>
						<li className='flex w-full items-center gap-4'>
							<div className='text-black leading-6 font-bold w-[30%] my-auto'>
								<h5>Employees:</h5>
							</div>
							<div className='leading-6 font-semibold text-gray-500 w-[70%]'>
								{editMode ? (
									<Select
										required
										placeholder='Select Employees'
										isMulti
										theme={theme => ({
											...theme,
											borderRadius: 0,
											colors: {
												...theme.colors,
												primary25: 'black',
												primary: 'black',
											},
										})}
										options={options}
										onChange={handleEmployeeChange}
										value={emplArr.map(employee => ({
											//@ts-ignore
											value: employee._id,
											//@ts-ignore
											label: employee.email,
										}))}
									/>
								) : (
									<p>
										{department.employees
											.map(e => {
												if (typeof e !== 'string') return `${e?.email}`;
											})
											.join(', ')}
									</p>
								)}
							</div>
						</li>
						{editMode && (
							<div className='w-full px-1'>
								<button onClick={handleSubmit} className='btn'>
									{mode}
								</button>
							</div>
						)}
					</ul>
				</section>
			</div>
		</>
	);
}

// function ListItem({
// 	title,
// 	editMode,
// 	changeHandler,
// 	value,
// }: {
// 	editMode: boolean;
// 	changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
// 	title: string;
// 	value: string;
// 	name: string;
// }) {
// 	return (
// 		<li className='flex w-full items-center gap-4'>
// 			<div className='text-black leading-6 font-bold w-[30%] my-auto'>
// 				<h5>{title}:</h5>
// 			</div>
// 			<div className='leading-6 font-semibold text-gray-500 w-[70%]'>
// 				{editMode ? (
// 					<input
// 						required
// 						onChange={changeHandler}
// 						name={name}
// 						type='text'
// 						className='h-10 text-black border border-gray-light rounded-sm w-full py-2 px-3 leading-tight focus:outline-none focus:bg-primary-light'
// 						placeholder='Enter event title'
// 						value={value}
// 					/>
// 				) : (
// 					<p>{value}</p>
// 				)}
// 			</div>
// 		</li>
// 	);
// }
