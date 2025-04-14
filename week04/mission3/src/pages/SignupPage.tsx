import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateUser } from "../utils/validate";
import { TUserValues } from "../types/TUser";
import { postSignup } from "../apis/auth";
import Arrow from '../images/Arrow.svg';
import StepOne from "../components/Signup/Step1";
import StepTwo from "../components/Signup/Step2";
import StepThree from "../components/Signup/Step3";

const SignupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [nickname, setNickname] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const validate = useCallback((values: TUserValues) => validateUser(values, step), [step]);
    const signup = useForm({ initialValue: { email: "", password: "", confirmPassword: "" }, validate });
  
    // 다음 step으로 이동
    const handleNext = () => {
      if (!signup.errors.email && signup.values.email) setStep(2);
    };
    const handlePasswordNext = () => {
      if (
        signup.values.password &&
        signup.values.confirmPassword &&
        !signup.errors.password &&
        !signup.errors.confirmPassword
      ) {
        setStep(3);
      }
    };
    
    // 확인용
    const handlePressSignup = async () => {
      try {
        const response = await postSignup({
            name: nickname,
            email: signup.values.email,
            password: signup.values.password,
        });
        if (response.status === 200 || response.status === 201){
            console.log("회원가입 성공!!");
            console.log("이메일, 닉네임", signup.values.email, nickname);
            navigate("/"); // 로그인 성공 시 메인 페이지로 이동
        }
      } catch (error: any) {
        console.error("회원가입 실패", error.response?.data.message || error.message);
      }
    };
  
    return (
      <div className="h-[700px] bg-black text-white flex justify-center items-start pt-20">
        <div className="w-full max-w-sm p-4">
          <div className="relative mb-6">
            <button
              onClick={() => (step > 1 ? setStep((prev) => (prev - 1) as 1 | 2 | 3) : navigate(-1))}
              className="absolute left-0 top-1/2 -translate-y-[45%]"
            >
              <img src={Arrow} alt="Back" className="w-5 h-5 invert rotate-180" />
            </button>
            <h2 className="text-center text-2xl font-bold">회원가입</h2>
          </div>
  
          {step === 1 && (
            <StepOne
              email={signup.values.email}
              error={signup.errors.email}
              touched={signup.touched.email}
              onChange={(val: string) => signup.handleChangeInput("email", val)}
              onBlur={() => signup.handleBlur("email")}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <StepTwo
              email={signup.values.email}
              password={signup.values.password}
              confirmPassword={signup.values.confirmPassword}
              errors={signup.errors}
              onChangePassword={(val: string) => signup.handleChangeInput("password", val)}
              onChangeConfirm={(val: string) => signup.handleChangeInput("confirmPassword", val)}
              onBlurPassword={() => signup.handleBlur("password")}
              onBlurConfirm={() => signup.handleBlur("confirmPassword")}
              onNext={handlePasswordNext}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              togglePassword={() => setShowPassword((prev) => !prev)}
              toggleConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}
            />
          )}
          {step === 3 && (
            <StepThree
              nickname={nickname}
              onChangeNickname={setNickname}
              onSubmit={handlePressSignup}
            />
          )}
        </div>
      </div>
    );
  };
  
export default SignupPage;