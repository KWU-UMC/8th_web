import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import UseLocalstorage from "../../hooks/useLocalstorage";

interface SignuppasswordI {
  setSubmittedPassword: React.Dispatch<SetStateAction<string | null>>;
}

export default function Signuppassword({
  setSubmittedPassword,
}: SignuppasswordI) {
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewPasswordCheck, setViewPasswordCheck] = useState<boolean>(false);

  const schema = z.object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." }),
  });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (data: FormData) => {
    setSubmittedPassword(data.password);
    const useLocalstorage = UseLocalstorage();
    useLocalstorage({ key: "password", value: data.password });
  };
  const oninvalid = () => {
    console.error(errors);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (e.target.value === "") {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(getValues("password") === e.target.value);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit, oninvalid)}
    >
      <div className="relative flex items-center">
        {viewPassword ? (
          <IoIosEye
            onClick={() => setViewPassword((prev) => !prev)}
            className="absolute right-4 w-6 h-6"
          />
        ) : (
          <IoIosEyeOff
            onClick={() => setViewPassword((prev) => !prev)}
            className="absolute right-4 w-6 h-6"
          />
        )}
        <input
          type={`${viewPassword ? null : "password"}`}
          {...register("password")}
          className="w-full p-2 bg-black border border-white rounded-xl"
          placeholder="비밀번호를 입력해주세요!"
        />
      </div>
      {isValid || !isDirty || (
        <span className="text-md text-red-600">
          비밀번호는 8자리 이상이어야 합니다.
        </span>
      )}
      <div className="relative flex items-center">
        {viewPasswordCheck ? (
          <IoIosEye
            onClick={() => setViewPasswordCheck((prev) => !prev)}
            className="absolute right-4 w-6 h-6"
          />
        ) : (
          <IoIosEyeOff
            onClick={() => setViewPasswordCheck((prev) => !prev)}
            className="absolute right-4 w-6 h-6"
          />
        )}
        <input
          type={`${viewPasswordCheck ? null : "password"}`}
          onChange={onChange}
          className="w-full p-2 bg-black border border-white rounded-xl"
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
        />
      </div>
      {isPasswordSame || (
        <span className="text-md text-red-600">비밀번호가 다릅니다.</span>
      )}
      <button
        className={`w-full bg-black rounded-xl ${
          isValid && isPasswordSame && !(value == "") && "bg-pink-300"
        }`}
        type="submit"
        disabled={!isValid || !isPasswordSame}
      >
        다음
      </button>
    </form>
  );
}
