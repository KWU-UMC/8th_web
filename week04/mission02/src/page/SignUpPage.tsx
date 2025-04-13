import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {FieldErrors, SubmitHandler, useForm, UseFormRegister, UseFormRegisterReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

type SignUpForm = z.infer<typeof signUpSchema>;

const signUpSchema = z.object({
    email: z.string().email({ message: '올바른 이메일을 입력하세요.' }),
    password: z.string().min(5, { message: '비밀번호는 5자 이상이어야 해요.' }),
    passwordConfirm: z.string(),
    username: z.string().min(1),
}).refine(data => data.password === data.passwordConfirm, {
    message: "비밀번호가 같지 않아요.",
    path: ["passwordConfirm"],
});

enum SignUpStep {
    EMAIL, PASSWORD, PROFILE_IMAGE
}

const EmailInputField = ({register, placeholder}: {
    register: UseFormRegister<SignUpForm>,
    placeholder: string
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const { onBlur, ...rest } = register('email');

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false);
        await onBlur(e);
    };

    return <div className={`mt-6 flex gap-x-2 items-center border border-white rounded-xl ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
        <input
            type="email"
            id="email"
            className="w-full p-2 rounded-xl focus:outline-none"
            placeholder={placeholder}
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    </div>
}

const PasswordInputField = ({placeholder, register}: {
    placeholder: string,
    register: UseFormRegisterReturn,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const { onBlur, ...rest } = register;

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false);
        await onBlur(e);
    };

    return <div className={`mt-2 flex gap-x-2 px-2 items-center border border-white rounded-xl ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
        <input
            type={isHidden ? "password" : "text"}
            className="w-full p-2 rounded-xl focus:outline-none grow"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
        />

        {
            isHidden ?
                <button onClick={() => setIsHidden(false)}>N</button>
                : <button onClick={() => setIsHidden(true)}>Y</button>
        }
    </div>
}

const SignUpEmail = ({errors, register, onClickNext}: {
    errors: FieldErrors<SignUpForm>,
    register: UseFormRegister<SignUpForm>,
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
                register={register}
                placeholder="이메일을 입력하세요"
            />

            {
                errors?.email ?
                    <p className="text-red-500">{errors.email.message}</p>
                    : <></>
            }

            <button
                onClick={onClickNext}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={errors.email?.message !== undefined}
            >다음</button>
        </>
    )
}

const SignUpPassword = ({email, errors, register, onClickNext}: {
    email: string,
    errors: FieldErrors<SignUpForm>,
    register: UseFormRegister<SignUpForm>,
    onClickNext: () => void,
}) => {
    const passwordRegister = register('password');
    const passwordConfirmRegister = register('passwordConfirm');

    return (
        <>
            <p
                className="mt-8 font-bold">
                이메일: {email}
            </p>

            <PasswordInputField
                placeholder="비밀번호를 입력하세요"
                register={passwordRegister} />

            {
                errors.password !== undefined ?
                    <p className="text-red-500">{errors.password.message}</p>
                    : <></>
            }

            <PasswordInputField
                placeholder="비밀번호를 다시 입력하세요"
                register={passwordConfirmRegister} />

            {
                errors.passwordConfirm !== undefined ?
                    <p className="text-red-500">{errors.passwordConfirm.message}</p>
                    : <></>
            }

            <button
                onClick={onClickNext}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={errors?.password !== undefined || errors?.passwordConfirm !== undefined }
            >다음</button>
        </>
    )
}

const SignUpProfileImage = ({errors, register, onClickSubmit}: {
    errors: FieldErrors<SignUpForm>,
    register: UseFormRegister<SignUpForm>,
    onClickSubmit: () => void,
}) => {
    return (
        <div className="flex flex-col items-center gap-y-4 mt-8">
            <img className="rounded-full size-32 bg-neutral-400 border-white" alt="profile" />

            <input
                {...register('username')}
                className="w-full p-2 border rounded-xl border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="이름을 입력하세요" />

            <button
                onClick={onClickSubmit}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={errors.username !== undefined}
            >제출</button>
        </div>
    )
};

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [type, setType] = useState(SignUpStep.EMAIL)

    const { register, trigger, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: ''
        },
        resolver: zodResolver(signUpSchema),
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.username,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            console.log(await response.json())
            navigate('/login')
        }
    }

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
                        } else {
                            navigate(-1)
                        }
                    }}
                >&lt;</button>
                <p className="text-2xl">회원가입</p>
            </div>

            {
                type == SignUpStep.EMAIL ?
                    <SignUpEmail
                        errors={errors}
                        register={register}
                        onClickNext={async () => {
                            if (await trigger('email')) {
                                setType(SignUpStep.PASSWORD)
                            }
                        }} />
                    : (
                        type == SignUpStep.PASSWORD ?
                            <SignUpPassword email={""} errors={errors} register={register} onClickNext={() => { setType(SignUpStep.PROFILE_IMAGE) }} />
                            : <SignUpProfileImage errors={errors} register={register} onClickSubmit={handleSubmit(onSubmit)} />
                    )
            }
        </div>
    )
};
