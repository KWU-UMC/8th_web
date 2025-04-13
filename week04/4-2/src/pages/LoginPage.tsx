import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { ResponseSigninDto } from "../types/auth";
import { postSignin } from "../apis/auth";

//zod 사용하지 않고 만든 폼
const LoginPage = () => {
  const { values, getInputProps, errors, touched } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    const response = await postSignin(values);
    console.log(response.data);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 True

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
