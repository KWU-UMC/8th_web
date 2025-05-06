import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyinfo } from "../apis/auth";
import { TUserInfo } from "../types/TUser";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginBtn";

const MyPage = () => {
    const navigate = useNavigate();
    const {signOut} = useAuth();
    const [data, setData] = useState<TUserInfo>();

    useEffect(() => {
        const getData = async () => {
            const response = await getMyinfo();
            console.log(response);
            setData(response);
        };
        getData();
    }, []);

    const handleSignout = async () => {
        await signOut();
        navigate("/");  // 로그아웃 성공 시 메인 페이지로 이동
    }
    
    return(
        <div className="h-[700px] bg-black text-white flex justify-center items-start pt-20">
            <div className="w-full max-w-sm p-4">
                <div className="relative mb-4">
                    <h2 className="text-center text-2xl font-bold mb-2">마이페이지</h2>
                    <div className="text-center text-l">{data?.data?.name}님 환영합니다.</div>
                </div>

                <GoogleLoginButton />

                <button
                    onClick={handleSignout}
                    className={`w-full py-2 rounded-md text-white bg-[#E91E63] hover:bg-pink-700 transition-colors duration-200`}
                >
                로그아웃
                </button>
            </div>
        </div>
    );
}

export default MyPage;