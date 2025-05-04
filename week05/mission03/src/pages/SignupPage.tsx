import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
//zod는 유효성 검사 라이브러리
//zod는 타입스크립트와 함께 사용하여 유효성 검사를 수행할 수 있음
//zod는 스키마를 정의하고, 데이터를 검증하는 데 사용됨

const schema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    //string이고 email형식이어야 함
    //zod는 email형식인지 검사하는 메서드 제공
    //zod는 이메일 형식이 아닌 경우 에러메세지를 반환함
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하이어야 합니다."),
    passwordCheck: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하이어야 합니다."),
    name: z.string().min(1, "이름을 입력해주세요."),
    //string이고 최소 8자 이상이어야 함
    //zod는 최소 길이를 검사하는 메서드 제공
    //zod는 최소 길이가 아닌 경우 에러메세지를 반환함
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;
//zod는 infer를 사용하여 타입을 추론할 수 있음

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onBlur", // onBlur 이벤트 발생 시 유효성 검사
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //eslint-disable-next-line
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")} // 이메일 입력
          type={"email"}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          placeholder={"이메일"}
        />
        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          type={"password"}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          placeholder={"비밀번호"}
        />
        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}
        <input
          {...register("passwordCheck")}
          type={"password"}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.passwordCheck
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder={" 비밀번호 확인"}
        />
        {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          type={"name"}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          placeholder={"이름"}
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={
            "w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          }
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
