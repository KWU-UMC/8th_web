import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSiginInformation, validateSignin } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
    const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const navigate = useNavigate();
    const {values, errors, touched, getInputProps} = useForm<UserSiginInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        console.log(values);
        try{
            const response = await postSignin(values);
            setItem(response.data.accessToken);
        }catch(error){
            alert(error?.message);
        }
    }
    const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");
    
    //이전 페이지로 돌아가기 함수
    const handleGoBack = () => {
        navigate(-1);
    }

    return(
        <div className="flex flex-col items-center justify-center h-full gap-4
        bg-black text-white">
            <div className="flex justify-center items-center w-full px-4 py-4">
                <button
                    onClick={handleGoBack}
                    className="text-white hover:text-pink-500 transition-colors 
                    text-3xl w-[205px]
                    ">
                    {`<`}
                </button>
                <span className="text-white text-2xl w-[270px]"> 로그인 </span>
            </div>
            <div className="flex flex-col gap-3 mb-2">
                <button
                className={`flex items-center justify-center border border-[#ccc] 
                    w-[300px] p-[10px] rounded-sm hover:border-pink-500 transition-colors`} >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfIC05_FZCiPUcZ6Xnlvfvpw3nZVBaIGbALQ&s"
                        className="flex flex-between w-6 h-6" />    
                        <span className="w-[240px]"> 구글로그인 </span>
                </button>
            </div>

            <div className="flex items-center  w-[300px] mb-2">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 text-sm"> OR </span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex flex-col gap-3">
                <input 
                {...getInputProps("email")}
                className={`border border-[#ccc] 
                    w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.email && touched?.email ? "border-blue-300" : "border-gray-300"}`}
                type={"email"}
                placeholder={"이메일"} 
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email} </div>
                )}
                <input 
                {...getInputProps("password")}
                className={`border border-[#ccc] 
                    w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-blue-300" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호"} 
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password} </div>
                )}
                <button type="button" onClick={handleSubmit} disabled={isDisabled}
                className="w-full bg-blue-600 text-white py-3 rounded-md
                text-lg font-medium hover:bg-blue-700 transition-colors
                cursor-pointer disabled:bg-gray-300"> 로그인 </button>
            </div>
        </div>
    );
};

export default LoginPage;