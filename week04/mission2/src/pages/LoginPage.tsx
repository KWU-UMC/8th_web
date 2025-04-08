import { Link, useNavigate } from "react-router-dom";
import Arrow from '../images/Arrow.svg';
import GoogleLoginButton from "../components/GoogleLoginBtn";
import InputField from "../components/InputField";
import { validateLogin } from "../utils/validate";
import { useForm } from "../hooks/useForm";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();

    const login = useForm({
        initialValue: { email: "", password: "" },
        validate: validateLogin,
    });

    const isFormValid = !login.errors.email && !login.errors.password && login.values.email && login.values.password;

    // 확인용
    const handlePressLogin = async () => {
        try {
          const response = await axios.post("http://localhost:8000/v1/auth/signin", {
            email: login.values.email,
            password: login.values.password,
          });
      
          if (response.status === 200 || response.status === 201) {
            console.log("로그인 성공", response.data);
            navigate("/");      // 로그인 성공 시 메인 페이지로 이동
          } else {
            console.warn("예상치 못한 응답", response.status);
          }
        } catch (error: any) {
          if (error.response) {
            console.error("로그인 실패", error.response.data.message || error.message);
          } else {
            console.error("서버 연결 실패", error.message);
          }
        }
    };

    return (
        <div className="h-[700px] bg-black text-white flex justify-center items-start pt-20">
            <div className="w-full max-w-sm p-4">
                <div className="relative mb-6">
                    <Link to="/" className="absolute left-0 top-1/2 -translate-y-[45%]">
                        <img
                        src={Arrow}
                        alt="Back"
                        className="w-5 h-5 invert rotate-180"
                        />
                    </Link>
                    <h2 className="text-center text-2xl font-bold">로그인</h2>
                </div>
                        
                <GoogleLoginButton />
                <div className="flex items-center justify-center mb-4">
                    <hr className="flex-grow border-t border-white-600" />
                    <span className="mx-13 text-sm text-white-400">OR</span>
                    <hr className="flex-grow border-t border-white-600" />
                </div>

                <InputField
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                    {...login.getTextInputProps("email")}
                    />
                    {login.touched.email && login.errors.email && (
                    <p className="text-red-500 text-sm mt-1 mb-4">{login.errors.email}</p>
                )}

                <InputField
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    {...login.getTextInputProps("password")}
                    />
                    {login.touched.password && login.errors.password && (
                    <p className="text-red-500 text-sm mt-1 mb-2">{login.errors.password}</p>
                )}

                <button
                    onClick={handlePressLogin}
                    disabled={!isFormValid}
                    className={`w-full py-2 mt-2 rounded-md text-white transition ${
                        isFormValid
                        ? 'bg-[#E91E63] hover:bg-pink-700'
                        : 'bg-neutral-800 cursor-not-allowed'
                    }`}
                >
                로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;