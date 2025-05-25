import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { UserSiginInformation, validateSignin } from "../utils/validate";
import { useLogin } from "../hooks/mutations/useLogin";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLogin(); // useMutation 기반 로그인 훅

  useEffect(() => {
    if (accessToken) {
      navigate("/"); // 이미 로그인되어 있으면 홈으로 이동
    }
  }, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } = useForm<UserSiginInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  const handleSubmit = () => {
    loginMutation.mutate(values, {
      onSuccess: async (data) => {
        await login(values); // AuthContext 내부 상태 업데이트
        navigate("/");
      },
      onError: () => {
        alert("로그인 실패. 이메일이나 비밀번호를 확인해주세요.");
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      <div className="w-[300px] flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="text-white hover:text-pink-500 transition-colors text-3xl mb-7"
        >
          {`<`}
        </button>
        <div className="text-white text-2xl text-center flex-1 mb-7 -ml">
          로그인
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-2">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center border border-[#ccc] w-[300px] p-[10px] rounded-sm hover:border-pink-500 transition-colors"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfIC05_FZCiPUcZ6Xnlvfvpw3nZVBaIGbALQ&s"
            alt="구글"
            className="w-6 h-6 mr-2"
          />
          <span className="w-[240px] text-center">구글 로그인</span>
        </button>
      </div>

      <div className="flex items-center w-[300px] mb-2">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className="border border-[#ccc] w-[300px] p-[10px] rounded-sm bg-black text-white"
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className="border border-[#ccc] w-[300px] p-[10px] rounded-sm bg-black text-white"
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || loginMutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
