import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useLoginMutation } from '../features/users/userEndpoints';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/users/authSlice';
import { useAppDispatch } from '../app/hooks';
import { toast } from 'react-toastify';
import errorExtractor from '../utils/errorExtractor';

interface FormData {
	email: string;
	password: string;
}
type Props = {};
export default function SignInPage({}: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
	});
	const [login] = useLoginMutation();
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await login(formData).unwrap();
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
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<main className='max-w-xl mx-auto min-h-fit p-10 text-md bg-white shadow-md '>
			<div>
				<h1 className='text-4xl font-bold uppercase text-center my-8'>
					Sign in
				</h1>

				<form className='px-14' onSubmit={submitHandler}>
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
						value={formData.password}
						onChange={changeHandler}
						minLength={8}
						maxLength={20}
						type='password'
						placeholder='Password'
						name='password'
					/>

					<button className='btn mb-4'>login</button>

					<Link to='/register' className='btn-secondary mb-8 block text-center'>
						Register Instead
					</Link>
				</form>
			</div>
		</main>
	);
}
