import GoogleLoginButton from "../GoogleLoginBtn";
import InputField from "../InputField";

const StepOne = ({ email, error, touched, onChange, onBlur, onNext }: any) => {
  return (
    <>
      <GoogleLoginButton />
      <div className="flex items-center justify-center my-4">
        <hr className="flex-grow border-t border-white-600" />
        <span className="mx-4 text-sm text-white-400">OR</span>
        <hr className="flex-grow border-t border-white-600" />
      </div>
      <InputField
        type="email"
        name="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="이메일을 입력해주세요!"
      />
      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        onClick={onNext}
        disabled={!email || !!error}
        className="w-full bg-pink-700 text-white py-2 mt-4 rounded disabled:bg-neutral-800"
      >
        다음
      </button>
    </>
  );
};

export default StepOne;