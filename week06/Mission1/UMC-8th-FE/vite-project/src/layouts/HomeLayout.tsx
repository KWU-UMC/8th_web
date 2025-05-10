import {Outlet } from "react-router-dom";
import Navbar from "../components/Narbar";

const HomeLayout = () =>{
    return(
        <div className="h-dvh flex flex-col bg-black">
            <Navbar/>
            <main className="flex-1"> 
                <Outlet/> 
            </main>
        </div>
    );
};

export default HomeLayout;