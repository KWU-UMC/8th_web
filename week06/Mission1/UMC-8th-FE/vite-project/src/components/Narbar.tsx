import { NavLink} from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const{accessToken} = useAuth();
    
    //bg-white dark:bg-gray-900
    // <div> 돌려돌려LP판 </div>
    return <nav className="bg-[#121210] shadow-md text-pink-500 font-bold p-5 text-lg
            flex justify-between items-right"> 
                <NavLink 
                    to="">
                    돌려돌려LP판
                </NavLink>
                <div className="flex space-x-3">
                    {!accessToken && (
                        <>
                            <NavLink
                            to="login"
                            className="bg-black text-white py-1 px-3 rounded-md
                            hover:bg-pink-600 transition-colors text-sm">
                            로그인
                            </NavLink>
                            <NavLink
                            to="signup"
                            className="bg-black text-white py-1 px-3 rounded-md
                            hover:bg-pink-600 transition-colors text-sm">
                            회원가입
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>;
};

export default Navbar;