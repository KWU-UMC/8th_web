import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignIn } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);
  // accessToken이 있으면 로그인 페이지에 접근할 수 없도록 navigate("/")로 이동시킨다.

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignIn,
    });
  const handleSubmit = async () => {
    await login(values);
  };
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");
  //에러가 있거나, 값이 비어있으면 disabled

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")} // 이메일 입력
          name="email"
          type={"email"}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder={"이메일"}
        />
        {errors?.email && touched.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          type={"password"}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={
            "w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          }
        >
          로그인
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          // disabled={isDisabled}
          className={
            "w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          }
        >
          <div className="flex items-center justify-center gap-4">
            <img src={"/images/google.svg"} alt="Google Logo Image" />
            <span>Google Login</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
