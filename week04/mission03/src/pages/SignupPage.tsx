import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup, postSignin } from "../apis/auth";
import { useState } from "react";

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
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
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
    const { passwordCheck, ...signupBody } = data;
    try {
      const signupRes = await postSignup(signupBody);
      const signinRes = await postSignin({
        email: signupBody.email,
        password: signupBody.password,
      });

      localStorage.setItem("accessToken", signinRes.data.accessToken);
      localStorage.setItem("refreshToken", signinRes.data.refreshToken);

      alert("회원가입 및 로그인 성공!");
    } catch (err) {
      alert("회원가입 실패! 이미 존재하는 이메일일 수 있습니다.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[340px] flex flex-col gap-4">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold">이메일 입력</h2>
            <input
              {...register("email")}
              type="email"
              placeholder="이메일"
              className={`border p-2 rounded ${
                errors.email ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="button"
              disabled={!!errors.email || !email}
              onClick={() => setStep(2)}
              className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold">비밀번호 입력</h2>
            <div className="text-sm text-gray-500 mb-2">이메일: {email}</div>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className={`border p-2 rounded w-full ${
                  errors.password
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <input
              {...register("passwordCheck")}
              type="password"
              placeholder="비밀번호 확인"
              className={`border p-2 rounded ${
                errors.passwordCheck
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300"
              }`}
            />
            {errors.passwordCheck && (
              <p className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </p>
            )}

            <input
              {...register("name")}
              type="text"
              placeholder="닉네임"
              className={`border p-2 rounded ${
                errors.name ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* 프로필 이미지 자리 (UI만) */}
            <div className="w-full h-[100px] bg-gray-200 rounded flex items-center justify-center">
              프로필 이미지 업로드 예정
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 disabled:bg-gray-300"
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
