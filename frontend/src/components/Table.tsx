import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useDeleteDepartmentMutation } from '../features/department/departmentEndPoints';
import { setCurrentDepartment } from '../features/department/departmentSlice';
import { openSidebar, setMode } from '../features/sideBar/sideBarSlice';
import IconDelete from '../icons/IconDelete';
import IconEdit from '../icons/IconEdit';
import IconInfo from '../icons/IconInfo';
import Layout from './Layout';
import Loader from './Loader';
import Pagination from './Pagination';

type Props = { departments: Department[] | null };
export default function Table({ departments }: Props) {
	const dispatch = useAppDispatch();
	const createHandler = () => {
		dispatch(setMode('CREATE'));
		// dispatch(setCurrentDepartment('CREATE'));
		dispatch(openSidebar());
	};
	if (!departments) return <h1>No Departments found</h1>;
	return (
		<Layout>
			<header className='px-5 py-4 border-b border-gray-100'>
				<div className='flex justify-between items-center'>
					<h2 className='font-semibold text-gray-800 text-2xl'>Departments</h2>
					<button
						className='btn-no-outline w-32 hover:bg-gray-100'
						onClick={createHandler}>
						+ Create
					</button>
				</div>
			</header>
			<div className='p-3'>
				<div className='overflow-x-auto'>
					<table className='table-auto w-full'>
						<thead className='text-md font-semibold uppercase text-gray-400 bg-gray-50'>
							<tr className='font-semibold text-left whitespace-nowrap'>
								<th className='p-2'>Name</th>
								<th className='p-2'>Category</th>
								<th className='p-2'>Salary</th>
								<th className='p-2'>Location</th>
								<th className='p-2'>Employees</th>
								<th className='p-2'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100'>
							{departments.map(department => (
								<TableRow key={department._id} department={department} />
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Pagination />
		</Layout>
	);
}
function TableRow({ department }: { department: Department }) {
	const { userInfo } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	const [deleteDepartment, { isLoading }] = useDeleteDepartmentMutation();
	const handleClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			if (e.currentTarget.id === 'delete-btn') {
				const res = await deleteDepartment({
					depId: department._id,
					token: userInfo!.token,
				}).unwrap();
				toast.success('Department deleted successfully');
			} else {
				dispatch(setCurrentDepartment(department));
				dispatch(openSidebar());
				const mode =
					e.currentTarget.id === 'info-btn'
						? 'INFO'
						: e.currentTarget.id === 'edit-btn'
						? 'EDIT'
						: 'CREATE';
				dispatch(setMode(mode));
			}
		} catch (e) {
			console.log(e);
		}
	};
	if (isLoading) return <Loader />;
	const Actions = (
		<>
			<button onClick={handleClick} id='info-btn'>
				<IconInfo
					height='1rem'
					width='1rem'
					className='text-primary text-blue-700'
				/>
			</button>

			<button onClick={handleClick} id='edit-btn'>
				<IconEdit height='1rem' width='1rem' className='text-primary' />
			</button>
			<button onClick={handleClick} id='delete-btn'>
				<IconDelete
					height='1rem'
					width='1rem'
					className='text-primary text-red-600'
				/>
			</button>
		</>
	);

	return (
		<tr className='whitespace-nowrap font-medium text-md text-start'>
			<td className='p-2 text-gray-800 uppercase'>
				{department.departmentName}
			</td>
			<td className='p-2'>{department.categoryName}</td>
			<td className='p-2 text-gray-500'>${department.salary}</td>
			<td className='p-2'>{department.location}</td>
			<td className='p-2 '>{department.employees.length}</td>
			<td className='p-2'>
				<div className='flex gap-4 items-center'>{Actions}</div>
			</td>
		</tr>
	);
}
