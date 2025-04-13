export type UserSigninInformation = {
  email: string;
  password: string;
};
// 이메일 검사

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  //비밀번호 8자 20자 사이
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
  }
  return errors;
}

function validateSignIn(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignIn };
