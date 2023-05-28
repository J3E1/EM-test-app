import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SideBar from './components/SideBar';
import DepartmentsPage from './pages/DepartmentsPage';
import { useAppSelector } from './app/hooks';
import PrivateRoute from './components/PrivateRoute';
import EmployeesPage from './pages/EmployeesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className=' bg-gray-100 text-black'>
				<div className='container mx-auto min-h-screen py-8'>
					<Routes>
						<Route path='/signin' element={<SignInPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='' element={<PrivateRoute />}>
							<Route path='/' element={<HomePage />} />
							<Route path='/departments' element={<DepartmentsPage />} />
							<Route path='/employees' element={<EmployeesPage />} />
						</Route>
					</Routes>
				</div>
			</div>
			<ToastContainer theme='dark' />
		</BrowserRouter>
	);
}

export default App;
