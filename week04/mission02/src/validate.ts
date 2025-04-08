const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type SignInForm = {
    email: string;
    password: string;
};

export function validate(v: SignInForm): Record<keyof SignInForm, string> {
    let email = '';
    let password = '';

    if (!emailRegex.test(v.email)) {
        email = '올바른 이메일을 입력하세요.';
    }

    if (v.password.length < 6) {
        password = '비밀번호는 6자 이상이어야 합니다.';
    }

    return { email, password };
}
