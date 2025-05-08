import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    passwordCheck: z.string(),
    name: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const { getItem, setItem: setStoredEmail } = useLocalStorage("signup-email");
  const storedEmail = getItem() || "";

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: storedEmail,
    },
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  const onSubmit = (data: FormFields) => {
    console.log("회원가입 완료!", data);
    postSignup(data);
  };

  const handleNext = async () => {
    if (step === 1 && (await trigger("email"))) {
      setStoredEmail(email);
      setStep(2);
    } else if (
      step === 2 &&
      (await trigger(["password", "passwordCheck"])) &&
      password === passwordCheck
    ) {
      setStep(3);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-full gap-4"
    >
      <div className="flex flex-col gap-3 w-[300px]">
        {step === 1 && (
          <>
            <input
              {...register("email")}
              placeholder="이메일"
              className={`border p-2 rounded-sm ${
                errors.email ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
              type="email"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

            <button
              type="button"
              onClick={handleNext}
              className={`w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300`}
              disabled={!email}
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-sm text-gray-600 mb-1">이메일: {storedEmail}</div>

            <div className="relative">
              <input
                {...register("password")}
                placeholder="비밀번호"
                className={`border p-2 pr-10 rounded-sm w-full ${
                  errors.password ? "border-red-500 bg-red-100" : "border-gray-300"
                }`}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500"
              >
                {showPassword ? "숨김" : "보기"}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
            
            <div className="relative">
            <input
              {...register("passwordCheck")}
              placeholder="비밀번호 확인"
              className={`border p-2 pr-10 rounded-sm w-full ${
                errors.passwordCheck ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
              type={showPasswordCheck ? "text" : "password"}
            />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500"
              >
                {showPasswordCheck ? "숨김" : "보기"}
              </button>
            </div>
            {errors.passwordCheck && (
              <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300"
              disabled={!password || !passwordCheck}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              {...register("name")}
              placeholder="닉네임"
              className={`border p-2 rounded-sm ${
                errors.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700"
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignupPage;
