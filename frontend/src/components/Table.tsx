import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useDeleteDepartmentMutation } from '../features/department/departmentEndPoints';
import { setCurrentDepartment } from '../features/department/departmentSlice';
import { openSidebar, setMode } from '../features/sideBar/sideBarSlice';
import IconDelete from '../icons/IconDelete';
import IconEdit from '../icons/IconEdit';
import IconInfo from '../icons/IconInfo';
import Layout from './Layout';
import Pagination from './Pagination';

type Props = { departments: Department[] };
export default function Table({ departments }: Props) {
	const dispatch = useAppDispatch();
	const createHandler = () => {
		dispatch(setMode('CREATE'));
		// dispatch(setCurrentDepartment('CREATE'));
		dispatch(openSidebar());
	};
	return (
		<Layout>
			<header className='px-5 py-4 border-b border-gray-100'>
				<div className='flex justify-between items-center'>
					<h2 className='font-semibold text-gray-800 text-xl'>Departments</h2>
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
						<thead className='text-sm font-semibold uppercase text-gray-400 bg-gray-50'>
							<tr>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-left'>Name</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-left'>Category</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-left'>Salary</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-center'>Location</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-center'>Employees</div>
								</th>
								<th className='p-2 whitespace-nowrap'>
									<div className='font-semibold text-center'>Actions</div>
								</th>
							</tr>
						</thead>
						<tbody className='text-md divide-y divide-gray-100'>
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
	const [deleteDepartment] = useDeleteDepartmentMutation();
	const handleClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			if (e.currentTarget.id === 'delete-btn') {
				const res = await deleteDepartment({
					depId: department._id,
					token: userInfo!.token,
				});
				console.log('🚀 ~ file: EventItem.tsx:28 ~ res:', res);
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
		<tr>
			<td className='p-2 whitespace-nowrap'>
				<div className='font-medium text-gray-800'>
					<div className='uppercase'>{department.departmentName}</div>
				</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='text-left'>{department.categoryName}</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='text-left font-medium text-gray-500'>
					${department.salary}
				</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='text-lg text-center'>{department.location}</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='text-sm text-center'>{department.employees.length}</div>
			</td>
			<td className='p-2 whitespace-nowrap'>
				<div className='text-sm text-center flex gap-4 justify-center items-center'>
					{Actions}
				</div>
			</td>
		</tr>
	);
}
