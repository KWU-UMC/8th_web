import InputField from "../InputField";
import Profile from "../../images/Profile.svg";

const StepThree = ({ nickname, onChangeNickname, onSubmit }: any) => {
  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <img src={Profile} alt="기본 프로필 이미지" className="w-28 h-28 rounded-full" />
      </div>
      <InputField
        type="text"
        name="nickname"
        value={nickname}
        onChange={(e) => onChangeNickname(e.target.value)}
        placeholder="닉네임을 입력해주세요"
      />
      <button
        onClick={onSubmit}
        disabled={!nickname.trim()}
        className="w-full bg-pink-700 text-white py-2 mt-4 rounded disabled:bg-neutral-800"
      >
        회원가입 완료
      </button>
    </>
  );
};

export default StepThree;