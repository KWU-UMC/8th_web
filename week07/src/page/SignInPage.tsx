import {useNavigate} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage.ts";
import {useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import client from "../util/client.ts"; // Assuming you have a similar client setup

const signInSchema = z.object({
    email: z.string().email({ message: '올바른 이메일을 입력하세요.' }),
    password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
});

type SignInForm = z.infer<typeof signInSchema>;

export const SignInPage = () => {
    const navigate = useNavigate();
    const [, setAccessToken] = useLocalStorage<string | undefined>('accessToken', undefined);
    const [, setRefreshToken] = useLocalStorage<string | undefined>('refreshToken', undefined);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInForm>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(signInSchema),
        mode: 'onBlur'
    });

    const signInMutation = useMutation({
        mutationFn: async (data: SignInForm) => {
            const response = await client.post('/v1/auth/signin', { // Using client helper
                email: data.email,
                password: data.password,
            });
            return response.data; // Assuming client handles response.json() and data structure
        },
        onSuccess: (responseData) => {
            // Assuming responseData has { data: { accessToken: string, refreshToken: string } } structure
            const accessToken = responseData.data.accessToken;
            const refreshToken = responseData.data.refreshToken;

            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            console.log('refreshToken: ', refreshToken)

            alert('로그인 성공');
            navigate('/'); // Optional: navigate to home or dashboard on success
        },
        onError: () => {
            alert('로그인 실패');
        }
    });

    const onSubmit = (data: SignInForm) => {
        signInMutation.mutate(data);
    };

    return (
        <div className="mt-12 w-96 mx-auto bg-neutral-300 p-8 rounded-2xl">
            <div className="flex gap-4 h-4 justify-center items-center relative">
                <button
                    className="absolute left-0 hover:bg-neutral-400 p-4 rounded-xl"
                    onClick={() => { navigate(-1) }}
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="mt-6 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이메일을 입력하세요"
                />

                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}

                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    className="mt-4 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="비밀번호를 입력하세요"
                />

                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <button
                    type="submit"
                    className="mt-4 w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-200"
                    disabled={signInMutation.isPending || !!errors.email || !!errors.password}
                >
                    {signInMutation.isPending ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </div>
    )
}
