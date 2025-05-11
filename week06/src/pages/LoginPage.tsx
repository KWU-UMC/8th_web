import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const { values, getInputProps, errors, touched } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
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

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-center font-semibold mb-6">로그인</h1>
        <input
          {...getInputProps("email")}
          name="email"
          className={`bg-zinc-800 border w-[300px] p-[10px] focus:border-white rounded-sm placeholder-gray-400
        ${
          errors?.email && touched?.email
            ? "border-red-500 bg-red-900"
            : "border-gray-600"
        }`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-400 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`bg-zinc-800 border w-[300px] p-[10px] focus:border-white rounded-sm placeholder-gray-400
        ${
          errors?.password && touched?.password
            ? "border-red-500 bg-red-900"
            : "border-gray-600"
        }`}
          type="password"
          placeholder="비밀번호"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-white text-black py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer disabled:bg-gray-500"
        >
          로그인
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full max-w-xs p-2 bg-white hover:bg-gray-100 rounded border border-gray-300"
        >
          <img
            src="/images/img.webp"
            alt="Google logo"
            className="w-6 h-6 mr-2"
          />
          <span className="text-black text-sm">구글 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
