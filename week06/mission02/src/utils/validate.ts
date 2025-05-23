export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };
  //에러가 없을 수 있기 때문에 초기값을 빈 문자열로 설정
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  // 이메일 형식 검사
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
  }
  // 비밀번호 길이 검사

  return errors;
  // 에러가 없으면 빈 객체를 반환
  // 에러가 있으면 에러 객체를 반환
  // 에러 객체는 { email: "", password: "" } 형태
}

function validateSignIn(values: UserSigninInformation) {
  return validateUser(values);
  // validateUser 함수를 호출하여 에러를 검사
  // validateUser 함수는 에러가 없으면 빈 객체를 반환하고
  // 에러가 있으면 에러 객체를 반환
}

export { validateSignIn };
