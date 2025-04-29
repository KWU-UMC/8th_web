import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyinfo } from "../apis/auth";
import { TUserInfo } from "../types/TUser";

const HomePage = () => {
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
    }
    
    return(
        <div>
            <div className="text-white">홈페이지</div>
            <div className="text-white">{data?.data?.name}님 환영합니다.</div>
        </div>
    );
}

export default HomePage;