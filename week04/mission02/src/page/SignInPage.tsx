import {useForm} from "../hooks/useForm.ts";
import {SignInForm, validate} from "../validate.ts";

export const SignInPage = () => {
    const { values, getInputProps, errors } = useForm<SignInForm>({
        initialValue: {
            email: '',
            password: ''
        },
        validate: validate
    });

    return (
        <div className="mt-12 w-96 mx-auto bg-neutral-300 p-8 rounded-2xl">
            <div className="flex gap-4 h-4 justify-center items-center relative">
                <button
                    className="absolute left-0 hover:bg-neutral-400 p-4 rounded-xl"
                    onClick={() => { }}
                >&lt;</button>
                <p className="text-2xl">로그인</p>
            </div>

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

            <input
                {...getInputProps('password')}
                type="password"
                id="password"
                className="mt-4 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
            />

            {
                values.password.length > 0 && errors?.password ?
                    <p className="text-red-500">{errors.password}</p>
                    : <></>
            }

            <button
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                disabled={values.password.length == 0 || values.email.length == 0 || errors?.password?.length != 0 || errors?.email?.length != 0}
            >
                로그인
            </button>
        </div>
    )
}
