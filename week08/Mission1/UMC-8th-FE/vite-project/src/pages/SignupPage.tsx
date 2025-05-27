import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup, postSignin } from "../apis/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import passwordIcon from '../assets/eyesClosedIcon.png';
import profileIcon from '../assets/profileIcon.png';

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },} = useForm<FormFields>({
    defaultValues: {
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    });


    const email = watch("email");

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
        try {
            const signupRes = await postSignup(rest);
            const signinRes = await postSignin({
                email: rest.email,
                password: rest.password,
            });

            localStorage.setItem("accessToken", signinRes.data.accessToken);
            localStorage.setItem("refreshToken", signinRes.data.refreshToken);
            
            console.log(signupRes)
            console.log(signinRes)

        } catch (error) {
            alert(error?.message);
            console.error(error);
        }
    };

    //이전 페이지로 돌아가기 함수
    const handleGoBack = () => {
        navigate(-1);
    }


    return (
        <div className="flex flex-col justify-center items-center h-full gap-4
            bg-black text-white">
            <div className="flex justify-center items-center w-full px-4 py-4">
                <button
                    onClick={handleGoBack}
                    className="text-white hover:text-pink-500 transition-colors 
                    text-3xl w-[230px]
                    ">
                    {`<`}
                </button>
                <span className="text-white text-2xl w-[325px]"> 회원가입 </span>
            </div>
            {step !== 3 && (
            <>
            <div className="flex flex-col gap-3 mb-2">
                <button className={`flex items-center justify-center border border-[#ccc] w-[350px] p-[10px] rounded-sm hover:border-pink-500 transition-colors`}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfIC05_FZCiPUcZ6Xnlvfvpw3nZVBaIGbALQ&s"
                        className="flex flex-between w-6 h-6"/>
                    <span className="w-[290px] mr-3">구글로그인</span>
                </button>
            </div>

            <div className="flex items-center w-[350px]">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 text-sm"> OR </span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            </>
            )}

            <div className="flex flex-col gap-3">
                {step === 1 && (
                <>  
                <input
                    {...register("email")}
                    className={`bg-[#121210] border border-[#ccc] 
                    w-[350px] p-[10px] focus:border-[#807bff] rounded-sm mb-2
                    ${errors?.name? "border-blue-300" : "border-gray-300"}`}
                    type={"email"}
                    placeholder={"이메일"} 
                />
                {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message} </div>
                )}
                <button
                    type="button"
                    disabled={!!errors.email || !email}
                    onClick={() => setStep(2)}
                    className="w-full bg-pink-500 text-white py-2 rounded-md
                    text-lg font-medium hover:bg-pink-600 transition-colors
                    cursor-pointer disabled:bg-[#121210]">
                    다음
                </button>
                </>)}
                
                
                {step === 2 && (
                <>
                <div className="flex justify-center text-m text-gray-500 mb-2"> 📧 이메일: {email}</div>

                <div className="flex flex-col gap-3 relative">
                    <input
                        {...register('password')}
                        name="password"
                        className={`border border-[#ccc] 
                        w-[350px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password? "border-blue-300" : "border-gray-300"}`}
                        type={showPassword ? "text" : "password" } 
                        placeholder={"비밀번호"} 
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-6 transform -translate-y-1/2  text-sm">
                        {showPassword ? ("👁️") : (
                            <img src={passwordIcon} alt="Password Icon" 
                            className="w-6 h-6"/> )}
                    </button>

                    {errors.password && (
                    <div className={"text-red-500 text-sm"}> {errors.password.message} </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 relative">
                    <input
                        {...register("passwordCheck")}
                        name="passwordCheck"
                        className={`border border-[#ccc] 
                        w-[350px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.passwordCheck? "border-blue-300" : "border-gray-300"}`}
                        type={showPasswordCheck ? "text" : "password" }  
                        placeholder={"비밀번호를 다시 한 번 입력해주세요!"} />
                    <button
                        type="button"
                        onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                        className="absolute right-3 top-6 transform -translate-y-1/2  text-sm">
                        {showPasswordCheck ? ("👁️") : (
                            <img src={passwordIcon} alt="Password Icon" 
                            className="w-6 h-6"/> )}
                    </button>
                    {errors.passwordCheck && (
                        <div className={"text-red-500 text-sm"}> {errors.passwordCheck.message} </div>
                    )}
                </div>
                <button
                type="button"
                disabled={!!errors.password}
                onClick={() => setStep(3)}
                className="w-full bg-pink-500 text-white py-2 rounded-md
                    text-lg font-medium hover:bg-pink-600 transition-colors
                    cursor-pointer disabled:bg-[#121210]">
                    다음
                </button>
                </>)}

                {step == 3 && (
                <>
                <div className="w-full rounded flex items-center justify-center">
                    <img src={profileIcon} alt="ProfileIcon" className="w-50 h-50" />
                </div>
                <div className="flex flex-col gap-3 relative">
                    <input
                        {...register("name")}
                        className={`border border-[#ccc] 
                        w-[350px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.name? "border-blue-300" : "border-gray-300"}`}
                        type={"name"}
                        placeholder={"닉네임"} />
                    {errors.name && (
                        <div className={"text-red-500 text-sm"}> {errors.name.message} </div>
                    )}

                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleSubmit(onSubmit)}
                        className="w-full bg-pink-500 text-white py-2 rounded-md
                        text-lg font-medium hover:bg-pink-600 transition-colors
                        cursor-pointer disabled:bg-[#121210]">
                        회원가입
                    </button>
                </div>
                </>
            )}
        </div>
    </div>
    );
};

export default SignupPage;