const emailPattern = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+(\.[A-Za-z]{2,})+$/;

type TUserValues = {
  email: string;
  password: string;
};

type TUserErrors = Partial<Record<keyof TUserValues, string>>;

function validateUser(values: TUserValues): TUserErrors {
  const errors: TUserErrors = {};

  if (values.email && !emailPattern.test(values.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.';
  }

  if (values.password && values.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.';
  }

  return errors;
}

export function validateLogin(values: TUserValues): TUserErrors {
  return validateUser(values);
}