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
						{/* <Route path='/forgot-password' element={<ForgotPasswordPage />} />
					<Route path='/reset-password' element={<SetNewPasswordPage />} />
					<Route path='/otp-verification' element={<OtpVerificationPage />} />
					<Route path='' element={<PrivateRoute />}>
						<Route path='/' element={<HomePage />} />
						<Route path='/events' element={<EventsPage />} />
						<Route path='/events/:eventId' element={<EventDetailPage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/contact' element={<ContactPage />} />
						<Route path='/update-password' element={<UpdatePassword />} />
					</Route> */}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
