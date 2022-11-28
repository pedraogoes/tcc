import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/Authenticate';

export const PrivateRoute = () => {
    const { user } = useAuth();

    return (!!user) ? <Outlet /> : <Navigate to={'/'} replace/>
}