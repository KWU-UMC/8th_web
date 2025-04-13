import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {z} from "zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
    password: z.string()
    .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
    }),
    passwordCheck: z.string()
    .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
    }),
    name: z.string().min(1, {message: "이름을 입력해주세요."}),
})
.refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () =>{
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}, } = useForm<FormFields>({
        defaultValues: {
            name:"",
            email:"",
            password:"",
            passwordCheck:"",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    })

    const onSumbit: SubmitHandler<FormFields> = async (data) => {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const{passwordCheck, ...rest} = data;

        const response = await postSignup(rest);
        console.log(response);
    };

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
                <span className="text-white text-2xl w-[270px]"> 회원가입 </span>
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
                {...register('name')}
                className={`border border-[#ccc] 
                    w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.name? "border-blue-300" : "border-gray-300"}`}
                type={"name"}
                placeholder={"이름"} 
                />
                {errors.name && (
                    <div className={"text-red-500 text-sm"}> {errors.name.message} </div>
                )}

                <input 
                {...register('email')}
                className={`border border-[#ccc] 
                    w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.name? "border-blue-300" : "border-gray-300"}`}
                type={"email"}
                placeholder={"이메일"} 
                />
                {errors.email && (
                    <div className={"text-red-500 text-sm"}> {errors.email.message} </div>
                )}

                <input 
                {...register('password')}
                name="password"
                className={`border border-[#ccc] 
                    w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password? "border-blue-300" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호"} 
                />
                {errors.password && (
                    <div className={"text-red-500 text-sm"}> {errors.password.message} </div>
                )}

                <input 
                {...register('passwordCheck')}
                name="passwordCheck"
                className={`border border-[#ccc] 
                    w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.passwordCheck? "border-blue-300" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호 확인"} 
                />
                {errors.passwordCheck && (
                    <div className={"text-red-500 text-sm"}> {errors.passwordCheck.message} </div>
                )}

                <button type="button" onClick={handleSubmit(onSumbit)} disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-md
                text-lg font-medium hover:bg-blue-700 transition-colors
                cursor-pointer disabled:bg-gray-300"> 회원가입 </button>
            </div>
        </div>
    );
};

export default SignupPage;