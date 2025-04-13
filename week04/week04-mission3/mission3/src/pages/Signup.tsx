import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import{z} from "zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아님" }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상" }).max(20, { message: "비밀번호 20자 이상" }),
  name: z.string().min(1, { message: "이름 입력" }),
  passwordCheck: z.string().min(8, { message: "비밀번호는 8자 이상" }).max(20, { message: "비밀번호 20자 이상" }),
})
.refine((data) => data.password === data.passwordCheck, { message: "비밀번호 일치x", path: ['passwordCheck'] });

type FormFields = z.infer<typeof schema>

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck:"",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);
    console.log(response);
  }
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-[300px] flex flex-col gap-4 text-white">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-2xl font-bold">&lt;</button>
          <div className="flex-1 text-center text-xl font-semibold">로그인</div>
          <div className="w-[24px]"></div>
        </div>
    
        {/*구글*/}
        <button className="border border-white rounded-md py-2 w-full flex items-center justify-center gap-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" className="w-5 h-5" />
          <span>구글 로그인</span>
        </button>
    
        {/*OR*/}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white" />
          <span className="text-sm text-white">OR</span>
          <div className="flex-1 h-px bg-white" />
        </div>
    
        <input
          {...register("email")}
          type={"email"}
          placeholder="이메일"
          className={`w-full p-3 rounded-md border bg-transparent placeholder-white text-white 
                ${errors?.email ? "border-red-500 bg-red-900" : "border-white"}`}
        />
        {errors.email && <div className={'text-red-500 text-sm'}>{errors.email.message}</div>}

    
        <input
          {...register("password")}
          type={"password"}
          placeholder="비밀번호"
          className={`w-full p-3 rounded-md border bg-transparent placeholder-white text-white 
                ${errors?.password?"border-red-500 bg-red-900" : "border-white"}`}
        />
        {errors.password && <div className={'text-red-500 text-sm'}>{errors.password.message}</div>}

        <input
          {...register("passwordCheck")}
          type={"password"}
          placeholder="비밀번호 확인"
          className={`w-full p-3 rounded-md border bg-transparent placeholder-white text-white 
                ${errors?.passwordCheck?"border-red-500 bg-red-900" : "border-white"}`}
        />
        {errors.passwordCheck && <div className={'text-red-500 text-sm'}>{errors.passwordCheck.message}</div>}



        <input
          {...register("name")}
          type={"name"}
          placeholder="이름"
          className={`w-full p-3 rounded-md border bg-transparent placeholder-white text-white 
                ${errors?.password?"border-red-500 bg-red-900" : "border-white"}`}
        />
        {errors.name && <div className={'text-red-500 text-sm'}>{errors.name.message}</div>}



        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-[#ff3399] text-white py-3 rounded-md font-medium hover:bg-[#FFC0CB] transition-colors disabled:bg-gray-600">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Signup