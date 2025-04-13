import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { postSignin } from "../apis/auth";
import {useLocalStorage} from "../hooks/useLocalStorage.ts"
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const {values, errors, touched, getInputProps} =
    useForm<UserSigninInformation>( {
        initialValue: {
            email: "",
            password: ""
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
      console.log(values);
      
      try{
        const response = await postSignin(values)
        localStorage.setItem('accessToken', response.data.accessToken)
        setItem(response.data.accessToken)
      } catch(error) {
        if(error instanceof AxiosError) {
          alert(error?.message);
        }
      }
    };

    const onGoogleLogin = () => {
      console.log("구글 로그인 버튼 클릭됨");
      // 여기에 실제 구글 로그인 로직 추가 예정
    };
  

    const isDisabled = Object.values((errors || {})).some((error) => error.length > 0) || Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-[300px] mb-2">
          <button onClick={() => navigate(-1)} className="text-2xl">
            &lt;
          </button>
          <h2 className="text-xl font-semibold text-center flex-1 mr-6">로그인</h2>
        </div>

        <button
          onClick={onGoogleLogin}
          className="flex items-center justify-center gap-2 border border-gray-400 rounded-md px-4 py-2 w-[300px] font-medium hover:bg-gray-100"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          구글 로그인
        </button>

        <input
        {...getInputProps("email")}
        name="email"
        className={`border border-[#ccc] w-[300px] p-[10px] focus.border-[#87bff] rounded-sm
            ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type={"email"}
        placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input 
        {...getInputProps("password")}
        name="password"
        className={`border border-[#ccc] w-[300px] p-[10px] focus.border-[#87bff] rounded-sm
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type={"password"}
        placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
        type='button'
        onClick={handleSubmit}
        disabled={isDisabled}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
            로그인
        </button>
      </div>
    </div>
  )
}

export default LoginPage
