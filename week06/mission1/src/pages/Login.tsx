// src/pages/Login.tsx
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;

const LoginHeader = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
  width: 280px;
  position: relative;

  button {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  h2 {
    width: 100%;
    text-align: center;
    margin: 0;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: #e50914;
  font-size: 12px;
  margin: 5px 30px 0px 0px;
  width: 250px;
`;

const InputField = styled.input<{ $hasError?: boolean }>`
  width: 250px;
  padding: 15px;
  background-color: #333;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;

  &::placeholder {
    color: #8c8c8c;
  }

  ${({ $hasError }) =>
    $hasError &&
    `
    border: 1px solid #E50914;
  `}
`;

const LoginButton = styled.button<{ $disabled: boolean }>`
  width: 280px;
  padding: 15px;
  background-color: ${({ $disabled }) => ($disabled ? "#4a4a4a" : "#E50914")};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  transition: all 0.3s ease;
`;

const OrLine = styled.div`
  width: 280px;
  text-align: center;
  margin: 20px 0;
  color: #8c8c8c;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #8c8c8c;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  padding: 15px;
  background-color: black;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  gap: 10px;
`;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit = (data: LoginForm) => {
    console.log("로그인 시도:", data);
  };

  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "v1/auth/google/login";
  };

  return (
    <LoginContainer>
      <LoginHeader>
        <button type="button">←</button>
        <h2>로그인</h2>
      </LoginHeader>

      <GoogleButton onClick={handleLogin}>구글 로그인</GoogleButton>

      <OrLine>OR</OrLine>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputWrapper>
          <InputField
            type="text"
            placeholder="이메일"
            $hasError={!!errors.email}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <InputField
            type="password"
            placeholder="비밀번호"
            $hasError={!!errors.password}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputWrapper>

        <LoginButton type="submit" $disabled={!isValid}>
          로그인
        </LoginButton>
      </form>
    </LoginContainer>
  );
};

export default Login;
