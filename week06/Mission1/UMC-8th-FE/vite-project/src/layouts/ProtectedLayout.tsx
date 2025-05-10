import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Narbar";
import Footer from "../components/Footer";

const ProtectedLayout = () =>{
    const{accessToken} = useAuth();

    if(!accessToken){
        return <Navigate to={'/login'} replace/>
    }
    return (<div className="h-dvh flex flex-col bg-black">
            <Navbar/>
            <main className="flex-1 mt-3"> 
                <Outlet/> 
            </main>
            <Footer/>
        </div>
        );
};

export default ProtectedLayout;