import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Signuppassword from "../components/signuppassword";
import Signupemail from "../components/signupemail";
import { MdMarkEmailRead } from "react-icons/md";

export default function Signup() {
  const navigate = useNavigate();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 w-100">
      <div className="relative w-full flex justify-center items-center">
        <button onClick={() => navigate("/")} className="absolute left-0">
          ←
        </button>
        <h2 className="text-2xl font-bold">회원가입</h2>
      </div>
      {submittedEmail && (
        <div className="w-full flex gap-2 items-center">
          <MdMarkEmailRead className="w-6 h-6" />
          <span>{submittedEmail}</span>
        </div>
      )}
      <div className="relative w-full flex justify-center items-center border border-white rounded-md">
        <FcGoogle className="absolute left-4 w-6 h-6" />
        <button className="w-full">구글 로그인</button>
      </div>
      <div className="flex justify-around items-center">
        <hr className="solid flex-4" />
        <span className="flex-3">OR</span>
        <hr className="solid flex-4" />
      </div>
      <div>
        {submittedEmail ? (
          <Signuppassword />
        ) : (
          <Signupemail setSubmittedEmail={setSubmittedEmail} />
        )}
      </div>
    </div>
  );
}
