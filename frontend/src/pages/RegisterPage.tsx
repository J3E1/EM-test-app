import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { setCredentials } from '../features/users/authSlice';
import { useAppDispatch } from '../app/hooks';
import { useRegisterMutation } from '../features/users/userEndpoints';
import errorExtractor from '../utils/errorExtractor';
import { toast } from 'react-toastify';
interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender: string;
	hobbies: string[];
	role: 'employee' | 'manager' | '';
}
type Props = {};
export default function RegisterPage({}: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [register] = useRegisterMutation();
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		gender: '',
		hobbies: [''],
		role: '',
	});
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (formData.role === '' || formData.gender === '') {
				throw new Error('Please select a gender and a role');
			}
			const res = await register(formData).unwrap();
			dispatch(
				setCredentials({
					userInfo: {
						userId: res.user._id,
						role: res.user.role,
						token: res.token,
					},
				})
			);
			toast.success(res.message);
			navigate('/');
		} catch (error) {
			console.log(
				'🚀 ~ file: SignInPage.tsx:22 ~ submitHandler ~ error:',
				error
			);
			errorExtractor(error);
		}
	};
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'hobbies')
			return setFormData(prev => ({
				...prev,
				hobbies: e.target.value.split(','),
			}));
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<main className='max-w-xl mx-auto min-h-fit p-10 text-md bg-white shadow-md '>
			<h1 className='text-4xl font-bold uppercase text-center my-8'>
				Register
			</h1>

			<form className='px-14' onSubmit={submitHandler}>
				<Input
					required
					value={formData.firstName}
					onChange={changeHandler}
					type='text'
					placeholder='First Name'
					name='firstName'
				/>
				<Input
					required
					value={formData.lastName}
					onChange={changeHandler}
					type='text'
					placeholder='Last Name'
					name='lastName'
				/>
				<Input
					required
					value={formData.email}
					onChange={changeHandler}
					type='email'
					placeholder='Email'
					name='email'
				/>
				<Input
					required
					value={formData.hobbies}
					onChange={changeHandler}
					type='text'
					placeholder='Hobbies'
					name='hobbies'
				/>

				<Input
					required
					value={formData.password}
					onChange={changeHandler}
					minLength={8}
					maxLength={20}
					type='password'
					placeholder='Password'
					name='password'
				/>
				<select
					className='w-full bg-transparent border-b-[3px] border-black outline-none p-2 font-semibold mb-8'
					placeholder='Role'
					defaultValue=''
					onChange={e =>
						setFormData(prev => ({
							...prev,
							role: e.target.value as 'employee' | 'manager',
						}))
					}>
					<option value=''>Choose a Role</option>
					<option value='employee'>Employee</option>
					<option value='manager'>Manager</option>
				</select>
				<select
					className='w-full bg-transparent border-b-[3px] border-black outline-none p-2 font-semibold mb-8'
					placeholder='Gender'
					defaultValue=''
					onChange={e =>
						setFormData(prev => ({
							...prev,
							gender: e.target.value,
						}))
					}>
					<option value=''>Choose a Gender</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>

				<button className='btn mb-4'>Register</button>

				<Link to='/signin' className='btn-secondary mb-8 block text-center'>
					SignIn Instead
				</Link>
			</form>
		</main>
	);
}
