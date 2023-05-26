import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';

const PrivateRoute = () => {
	const { userInfo } = useAppSelector(state => state.auth);
	return userInfo ? <Outlet /> : <Navigate to='/signin' replace />;
};
export default PrivateRoute;
