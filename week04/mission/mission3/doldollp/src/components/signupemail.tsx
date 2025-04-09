import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignupemailI {
  setSubmittedEmail: React.Dispatch<SetStateAction<string | null>>;
}

export default function Signupemail({ setSubmittedEmail }: SignupemailI) {
  const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: FormData) => {
    setSubmittedEmail(data.email);
  };
  const oninvalid = () => {
    console.error(errors);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit, oninvalid)}
    >
      <input
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "올바른 이메일을 입력해주세요",
          },
        })}
        className="w-full p-2 bg-black border border-white rounded-xl"
        placeholder="이메일을 입력해주세요!"
      />
      {isValid || !isDirty || (
        <span className="text-md text-red-600">
          올바른 이메일 형식을 입력해주세요.
        </span>
      )}
      <button
        className={`w-full bg-black rounded-xl ${isValid && "bg-pink-300"}`}
        type="submit"
        disabled={!isValid}
      >
        다음
      </button>
    </form>
  );
}
