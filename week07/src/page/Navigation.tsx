import {Link, useNavigate} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {type UserResponse} from "../model/response/UserResponse.ts";
import client from "../util/client.ts";

export const Navigation = ({onClickHamburger}: {
    onClickHamburger: () => void,
}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [accessToken, setAccessToken] = useLocalStorage<string | undefined>('accessToken', undefined)
    const [, setRefreshToken] = useLocalStorage<string | undefined>('refreshToken', undefined)
    const isSignedIn = accessToken !== null;

    const { data } = useQuery<UserResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const {data} = await client.get('/v1/users/me')
            return data
        },
        enabled: isSignedIn,
    })

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return Promise.resolve();
        },
        onSuccess: () => {
            setAccessToken(undefined);
            setRefreshToken(undefined);
            queryClient.clear();
            navigate('/signin');
        },
        onError: () => {
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return <nav className="w-full flex justify-between px-36 py-4 border-b border-neutral-500 items-center">
        <div className="flex items-center">
            <button className="font-bold text-2xl p-4" onClick={onClickHamburger}>=</button>
            <Link to="/"><span>돌려돌려 LP판</span></Link>
        </div>

        <ul className="flex gap-4 items-center">
            {
                isSignedIn ?
                    <>
                        <span><b>{data?.data?.name}</b>님 환영합니다</span>
                        <Link to="/"><li className="px-6 py-3 rounded-md hover:bg-neutral-300 transition-colors duration-150 ease-in-out">홈</li></Link>
                        <li onClick={handleLogout} className="px-2 py-1 rounded-md hover:bg-neutral-300 transition-colors duration-150 ease-in-out cursor-pointer" role="button">로그아웃</li>
                    </>
                : <>
                <Link to="/login"><li className="bg-neutral-400 text-white px-4 py-1 rounded-md">로그인</li></Link>
                <Link to="/signup"><li className="bg-pink-500 text-white px-4 py-1 rounded-md">회원가입</li></Link>
                </>
            }
        </ul>
    </nav>
}
