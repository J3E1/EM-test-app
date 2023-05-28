import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/users/authSlice';
import { toast } from 'react-toastify';
type Props = {};
export default function Header({}: Props) {
	const { userInfo } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const logOutHandler = () => {
		navigate('/signin');
		toast.info('Logged out successfully');
		dispatch(logout());
	};

	if (userInfo === null) return <></>;

	return (
		<div className=' bg-black h-16 text-white'>
			<nav className='container mx-auto flex justify-between items-center h-full'>
				<h1 className='text-2xl font-semibold uppercase text-center'>ligma</h1>
				<div className='flex gap-6 items-center h-full'>
					{userInfo.role === 'manager' && (
						<>
							<Link
								to='/'
								className='text-md font-semibold uppercase text-center'>
								Home
							</Link>
							<Link
								to='/departments'
								className='text-md font-semibold uppercase text-center'>
								departments
							</Link>
							<Link
								to='/employees'
								className='text-md font-semibold uppercase text-center'>
								employees
							</Link>
						</>
					)}
					<button className='btn-outline w-28' onClick={logOutHandler}>
						log out
					</button>
				</div>
			</nav>
		</div>
	);
}
