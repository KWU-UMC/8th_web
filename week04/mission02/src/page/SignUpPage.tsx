import {useForm} from "../hooks/useForm.ts";
import {ChangeEvent, useState} from "react";

type SignUpForm = {
    email: string;
    password: string;
    passwordConfirm: string;
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateSignUp(value: SignUpForm): Record<keyof SignUpForm, string> {
    return {
        email: emailRegex.test(value.email) ? '' : '올바른 이메일을 입력하세요.',
        password: value.password.length > 0 && value.password.length < 5 ? '비밀번호는 5자 이상이어야 해요.' : '',
        passwordConfirm: value.passwordConfirm.length > 0 && value.passwordConfirm != value.password ? '비밀번호가 같지 않아요.' : ''
    }
}

enum SignUpStep {
    EMAIL, PASSWORD, PROFILE_IMAGE
}

const PasswordInputField = ({password, onPasswordChange}: {
    password: string,
    onPasswordChange: (password: string) => void
}) => {
    return <div className="form-group">
        <input
            type="password"
            id="password"
            className="mt-2 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
        />
    </div>
}

const SignUpEmail = ({values, errors, getInputProps, onClickNext}: {
    values: SignUpForm,
    errors: Record<keyof SignUpForm, string> | undefined,
    getInputProps: (name: keyof SignUpForm) => {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    },
    onClickNext: () => void,
}) => {
    return (
        <>
            <div
                className="flex my-6 p-4 border border-white rounded-xl items-center relative hover:ring-2 hover:ring-blue-500 cursor-pointer">
                <span className="text-xl text-blue-500 absolute left-4">G</span>
                <span className="w-full text-center">Gooooogle 로그인</span>
            </div>

            <div className="flex items-center justify-center gap-4">
                <hr className="flex-grow my-4 border-gray-400"/>
                <p className="text-gray-500 font-bold">OR</p>
                <hr className="flex-grow my-4 border-gray-400"/>
            </div>

            <input
                {...getInputProps('email')}
                type="email"
                id="email"
                className="mt-6 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이메일을 입력하세요"
            />

            {
                values.email.length > 0 && errors?.email ?
                    <p className="text-red-500">{errors.email}</p>
                    : <></>
            }

            <button
                onClick={onClickNext}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={values.email.length == 0 || errors?.email?.length != 0}
            >다음</button>
        </>
    )
}

const SignUpPassword = ({values, errors, getInputProps}: {
    values: SignUpForm,
    errors: Record<string, string> | undefined,
    getInputProps: (name: keyof SignUpForm) => {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    }
})=> {
    return (
        <>
            <p
                className="mt-8 font-bold">
                이메일: {values.email}
            </p>
            <input
                {...getInputProps('password')}
                type="password"
                id="password"
                className="mt-2 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
            />

            {
                values.password.length > 0 && errors?.password?.length ?
                    <p className="text-red-500">{errors.password}</p>
                    : <></>
            }

            <input
                {...getInputProps('passwordConfirm')}
                type="password"
                id="passwordConfirm"
                className="mt-6 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 다시 입력하세요"
            />

            {
                values.passwordConfirm.length > 0 && errors?.passwordConfirm ?
                    <p className="text-red-500">{errors.passwordConfirm}</p>
                    : <></>
            }

            <button
                onClick={() => {}}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={values.email.length == 0 || errors?.email?.length != 0}
            >다음</button>
        </>
    )
}

export const SignUpPage = () => {
    const [type, setType] = useState(SignUpStep.EMAIL);

    const { values, getInputProps, errors } = useForm<SignUpForm>({
        initialValue: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validate: validateSignUp
    })

    return (
        <div className="mt-12 w-96 mx-auto bg-neutral-300 p-8 rounded-2xl">
            <div className="flex gap-4 h-4 justify-center items-center relative">
                <button
                    className="absolute left-0 hover:bg-neutral-400 p-4 rounded-xl"
                    onClick={() => {
                        if (type == SignUpStep.PASSWORD) {
                            setType(SignUpStep.EMAIL)
                        }
                    }}
                >&lt;</button>
                <p className="text-2xl">회원가입</p>
            </div>

            {
                type == SignUpStep.EMAIL ?
                    <SignUpEmail
                        values={values}
                        errors={errors}
                        getInputProps={getInputProps}
                        onClickNext={() => { setType(SignUpStep.PASSWORD) }} />
                    : (
                        type == SignUpStep.PASSWORD ?
                            <SignUpPassword values={values} errors={errors} getInputProps={getInputProps}/>
                            : <></>
                    )
            }
        </div>
    )
};
