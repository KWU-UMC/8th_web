import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    if(!accessToken){
        return <Navigate to={'/login'} replace />
    }

    return (
        <>
            <Navbar /> 
            <Outlet />
        </>
    );
};

export default ProtectedLayout;