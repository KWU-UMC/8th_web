import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { postSignup } from "../apis/auth";
// import { postSignup } from "../apis/auth"; // API 호출은 테스트 끝나고 주석 해제

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;
type PageType = "first" | "second" | "third";

const SignupPage = () => {
  const [page, setPage] = useState<PageType>("first");

  const {
    register,
    handleSubmit,
    trigger,
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

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormFields)[] = [];

    if (page === "first") fieldsToValidate = ["email"];
    else if (page === "second")
      fieldsToValidate = ["password", "passwordCheck"];
    else return;

    const valid = await trigger(fieldsToValidate);
    if (!valid) return;

    if (page === "first") setPage("second");
    else if (page === "second") setPage("third");
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("입력된 회원가입 데이터:", data);
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);

    // accessToken 저장
    localStorage.setItem("accessToken", response.data.accessToken);

    console.log("회원가입 응답:", response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-semibold">회원가입</h1>

      <div className="flex flex-col gap-3 w-[300px]">
        {page === "first" && (
          <>
            <input
              {...register("email")}
              type="email"
              placeholder="이메일"
              autoComplete="email"
              className="border p-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <button onClick={handleNext} className="border p-2">
              다음
            </button>
          </>
        )}

        {page === "second" && (
          <>
            <input
              {...register("password")}
              type="password"
              placeholder="비밀번호"
              autoComplete="new-password"
              className="border p-2"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <input
              {...register("passwordCheck")}
              type="password"
              placeholder="비밀번호 확인"
              autoComplete="new-password"
              className="border p-2"
            />
            {errors.passwordCheck && (
              <p className="text-sm text-red-500">
                {errors.passwordCheck.message}
              </p>
            )}
            <button onClick={handleNext} className="border p-2">
              다음
            </button>
          </>
        )}

        {page === "third" && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <input
              {...register("name")}
              type="text"
              placeholder="이름"
              autoComplete="name"
              className="border p-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="border p-2"
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
