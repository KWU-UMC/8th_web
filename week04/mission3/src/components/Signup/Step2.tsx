import InputField from "../InputField";
import Email from '../../images/Email.png';
import PasswordIcon from "../../images/Password.svg";

const StepTwo = ({
  email,
  password,
  confirmPassword,
  errors,
  onChangePassword,
  onChangeConfirm,
  onBlurPassword,
  onBlurConfirm,
  onNext,
  showPassword,
  showConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
}: any) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <img src={Email} alt="email" className="w-5 h-5 invert" />
        <div className="text-sm text-gray-400">{email}</div>
      </div>

      <div className="relative">
        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          onBlur={onBlurPassword}
          placeholder="비밀번호를 입력해주세요!"
        />
        <button type="button" onClick={togglePassword} className="absolute right-3 translate-y-[50%]">
          <img src={PasswordIcon} alt="비밀번호 보기" className="w-5 h-5 invert block" />
        </button>
      </div>

      <div className="relative mt-2">
        <InputField
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => onChangeConfirm(e.target.value)}
          onBlur={onBlurConfirm}
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
        />
        <button type="button" onClick={toggleConfirmPassword} className="absolute right-3 translate-y-[50%]">
          <img src={PasswordIcon} alt="비밀번호 보기" className="w-5 h-5 invert block" />
        </button>
      </div>

      {(errors.password || errors.confirmPassword) && (
        <div className="text-red-500 text-sm mt-1">
          {errors.password && <div>{errors.password}</div>}
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!password || !confirmPassword || !!errors.password || !!errors.confirmPassword}
        className="w-full bg-pink-700 text-white py-2 mt-4 rounded disabled:bg-gray-700"
      >
        다음
      </button>
    </>
  );
};

export default StepTwo;