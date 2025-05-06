import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    //로그아웃 버튼
    const navigate = useNavigate();
    const{logout} = useAuth();

    // const getEmptyMyInfo = (): ResponseMyInfoDto => ({
    //     status: false,
    //     message: "",
    //     statusCode: 0,
    //     data: {
    //         id: 0,
    //         name: "",
    //         email: "",
    //         bio: null,
    //         avatar: null,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //     },
    // });

    const [data, setData] = useState<ResponseMyInfoDto>([]);

    useEffect(()=> {
        const getData = async () => {
            const response  = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    },[]);

    // 얘가 랜더링이 되어야 위에 있는 코드가 실행이 됨
    // 그렇기 때문에 위에 처리가 안되는거임 -> 이거를 위해 "?" 가 있어야 함
    console.log(data.data?.name);

    const handleLogout = async() => {
        await logout();
        navigate("/");
    };

    return (
    <div>
        <h1> {data.data?.name} </h1>
        <img src={data.data?.avatar as string} alt={"구글 로고"}/>
        <h1>{data.data?.email}</h1>

        <button className="bg-blue-600 text-white py-3 rounded-md
                text-lg font-medium hover:bg-blue-700 transition-colors
                cursor-pointer disabled:bg-gray-300"
        onClick={handleLogout}> 로그아웃 </button>
    </div>
    );
};

export default MyPage;