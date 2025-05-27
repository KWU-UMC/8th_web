import {Outlet } from "react-router-dom";
import Navbar from "../components/Narbar";


//비회원
const HomeLayout = () => {
    

    return (
        <div className="h-dvh flex flex-col bg-black">
        <Navbar/>
            
            <main className="flex-1 flex items-center justify-center bg-black">
                <div className="w-full max-w-sm px-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};


export default HomeLayout;