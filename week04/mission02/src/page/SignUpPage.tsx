import {useForm} from "../hooks/useForm.ts";
import {ChangeEvent, useState} from "react";

type SignUpForm = {
    email: string;
    password: string;
    passwordConfirm: string;
    username: string;
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateSignUp(value: SignUpForm): Record<keyof SignUpForm, string> {
    return {
        email: emailRegex.test(value.email) ? '' : '올바른 이메일을 입력하세요.',
        password: value.password.length > 0 && value.password.length < 5 ? '비밀번호는 5자 이상이어야 해요.' : '',
        passwordConfirm: value.passwordConfirm.length > 0 && value.passwordConfirm != value.password ? '비밀번호가 같지 않아요.' : '',
        username: '',
    }
}

enum SignUpStep {
    EMAIL, PASSWORD, PROFILE_IMAGE
}

const EmailInputField = ({getInputProps, placeholder}: {
    getInputProps: (name: keyof SignUpForm) => {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
    },
    placeholder: string
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const { value, onChange, onBlur } = getInputProps('email');

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur(e);
    };

    return <div className={`mt-6 flex gap-x-2 items-center border border-white rounded-xl ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
        <input
            type="email"
            id="email"
            className="w-full p-2 rounded-xl focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    </div>
}

const PasswordInputField = ({placeholder, password, onPasswordChange, onBlur}: {
    placeholder: string,
    password: string,
    onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur(e);
    };

    return <div className={`mt-2 flex gap-x-2 px-2 items-center border border-white rounded-xl ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
        <input
            type={isHidden ? "password" : "text"}
            id="password"
            className="w-full p-2 rounded-xl focus:outline-none grow"
            placeholder={placeholder}
            value={password}
            onChange={onPasswordChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />

        {
            isHidden ?
                <button onClick={() => setIsHidden(false)}>N</button>
                : <button onClick={() => setIsHidden(true)}>Y</button>
        }
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

            <EmailInputField 
                getInputProps={getInputProps}
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

const SignUpPassword = ({values, errors, getInputProps, onClickNext}: {
    values: SignUpForm,
    errors: Record<string, string> | undefined,
    getInputProps: (name: keyof SignUpForm) => {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    },
    onClickNext: () => void,
}) => {
    const {value: passwordValue, onChange: onPasswordChange, onBlur: onPasswordBlur} = getInputProps('password');
    const {value: passwordConfirmValue, onChange: onPasswordConfirmChange, onBlur: onPasswordConfirmBlur} = getInputProps('passwordConfirm');

    return (
        <>
            <p
                className="mt-8 font-bold">
                이메일: {values.email}
            </p>

            <PasswordInputField
                placeholder="비밀번호를 입력하세요"
                password={passwordValue}
                onPasswordChange={onPasswordChange}
                onBlur={onPasswordBlur} />

            {
                values.password.length > 0 && errors?.password?.length ?
                    <p className="text-red-500">{errors.password}</p>
                    : <></>
            }

            <PasswordInputField
                placeholder="비밀번호를 다시 입력하세요"
                password={passwordConfirmValue}
                onPasswordChange={onPasswordConfirmChange}
                onBlur={onPasswordConfirmBlur} />

            {
                values.passwordConfirm.length > 0 && errors?.passwordConfirm ?
                    <p className="text-red-500">{errors.passwordConfirm}</p>
                    : <></>
            }

            <button
                onClick={onClickNext}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={values.password.length == 0 || errors?.password?.length != 0 || values.passwordConfirm.length == 0 || errors?.passwordConfirm?.length != 0 }
            >다음</button>
        </>
    )
}

const SignUpProfileImage = ({values, errors, getInputProps, onClickSubmit}: {
    values: SignUpForm,
    errors: Record<string, string> | undefined,
    getInputProps: (name: keyof SignUpForm) => {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    },
    onClickSubmit: () => void,
}) => {
    return (
        <div className="flex flex-col items-center gap-y-4 mt-8">
            <img className="rounded-full size-32 bg-neutral-400 border-white" alt="profile" />

            <input
                {...getInputProps('username')}
                className="w-full p-2 border rounded-xl border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="이름을 입력하세요" />

            <button
                onClick={onClickSubmit}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={values.username.length == 0 || errors?.username?.length != 0}
            >제출</button>
        </div>
    )
};

export const SignUpPage = () => {
    const [type, setType] = useState(SignUpStep.EMAIL);

    const { values, getInputProps, errors } = useForm<SignUpForm>({
        initialValue: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: ''
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
                        } else if (type == SignUpStep.PROFILE_IMAGE) {
                            setType(SignUpStep.PASSWORD)
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
                            <SignUpPassword values={values} errors={errors} getInputProps={getInputProps} onClickNext={() => { setType(SignUpStep.PROFILE_IMAGE) }} />
                            : <SignUpProfileImage values={values} errors={errors} getInputProps={getInputProps} onClickSubmit={() => {}} />
                    )
            }
        </div>
    )
};
