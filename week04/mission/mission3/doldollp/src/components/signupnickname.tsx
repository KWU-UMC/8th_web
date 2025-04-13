import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import UseLocalstorage from "../../hooks/useLocalstorage";
import { signup } from "../../apis/auth";

interface SignupnicknameI {
  setSubmittedNickname: React.Dispatch<SetStateAction<string | null>>;
}
export default function Signupnickname({
  setSubmittedNickname,
}: SignupnicknameI) {
  const navigate = useNavigate();
  const schema = z.object({
    nickname: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmittedNickname(data.nickname);
    const useLocalstorage = UseLocalstorage();
    useLocalstorage({ key: "nickname", value: data.nickname });
    const signupResponse = await signup();
    navigate("/");
  };
  const oninvalid = () => {
    console.error(errors);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <FaRegUserCircle className="w-40 h-40" />
      <form className="w-full" onSubmit={handleSubmit(onSubmit, oninvalid)}>
        <input
          {...register("nickname")}
          className="w-full bg-black p-2 rounded-lg"
          placeholder="닉네임을 입력해주세요!"
        />
        <button
          className={`w-full bg-black text-white p-2 mt-2 rounded-lg ${
            isValid && "bg-pink-500"
          }`}
          type="submit"
          disabled={!isValid}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
}
