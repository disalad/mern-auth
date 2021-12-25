import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PublicRoute() {
    const { currentUser } = useAuth();
    console.log(currentUser, currentUser ? 'Truthry' : 'falsy');
    return currentUser ? <Navigate to='/' /> : <Outlet />;
}

export default PublicRoute;
