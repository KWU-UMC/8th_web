import { NavLink} from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { getMyInfo } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";

interface NavbarProps {
    onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
    const{accessToken} = useAuth();
    //useQuery()로 비동기식 api 호출 진행하기
    //회원가입 되어있을 때만 이런 식의 로직을 짜는거임임
    const{data, isLoading, isError} = useQuery({
        queryKey: ["myInfo"],
        queryFn: getMyInfo,
        enabled: !!accessToken
    });

    
    //bg-white dark:bg-gray-900
    // <div> 돌려돌려LP판 </div>
    return <nav className="bg-[#121210] shadow-md text-pink-500 font-bold p-5 text-lg
            flex justify-between items-center"> 
                <div className="flex items-center space-x-3">
                    <button className="text-white p-2" onClick={() =>{
                        console.log("삼단바 클릭됨!");
                        onToggleSidebar?.();
                    }}>
                        ☰ 
                    </button>
                    
                    <NavLink to="">
                        돌려돌려LP판
                    </NavLink>
                </div>
                
                <div className="flex items-center space-x-3">
                    {!accessToken &&  (
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
                    {accessToken&&(
                        <>
                            <span className="text-white py-1 px-3 rounded-md text-sm">
                                {isLoading
                                    ?"로딩 중..."
                                    :isError
                                    ?"불러오기 실패"
                                    : `😁${data?.data.name}님 반갑습니다.`
                                    }
                            </span>
                            <NavLink
                            to="logout"
                            className="bg-black text-white py-1 px-3 rounded-md
                            hover:bg-pink-600 transition-colors text-sm">
                            로그아웃
                            </NavLink>

                            {/* <NavLink
                            to="my"
                            className="bg-black text-white py-1 px-3 rounded-md
                            hover:bg-pink-600 transition-colors text-sm">
                            마이페이지
                            </NavLink>
                            <NavLink
                            to="search"
                            className="bg-black text-white py-1 px-3 rounded-md
                            hover:bg-pink-600 transition-colors text-sm">
                            검색
                            </NavLink> */}
                        </>
                    )}
                </div>
                
            </nav>;
};

export default Navbar;