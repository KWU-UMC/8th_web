import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../apis/authapi";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signup({ name, email, password });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="이름" onChange={onNameChange}></input>
        <input placeholder="이메일" onChange={onEmailChange}></input>
        <input
          placeholder="비밀번호"
          type="password"
          onChange={onPasswordChange}
        ></input>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
