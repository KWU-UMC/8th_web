import {Link} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export const Navigation = ({onClickHamburger}: {
    onClickHamburger: () => void,
}) => {
    const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null)
    const isSignedIn = accessToken !== null;

    return <nav className="w-full flex justify-between px-36 py-4 border-b border-neutral-500 items-center">
        <div className="flex gap-x-4">
            <button className="font-bold text-xl" onClick={onClickHamburger}>=</button>
            <Link to="/"><span>돌려돌려 LP판</span></Link>
        </div>

        <ul className="flex gap-4 items-center">
            {
                isSignedIn ?
                    <>
                        <Link to="/"><li className="px-6 py-3 rounded-md hover:bg-neutral-300 transition-colors duration-150 ease-in-out">홈</li></Link>
                        <li onClick={() => setAccessToken(undefined)} className="px-2 py-1 rounded-md hover:bg-neutral-300 transition-colors duration-150 ease-in-out">로그아웃</li>
                    </>
                : <>
                <Link to="/login"><li className="bg-neutral-400 text-white px-4 py-1 rounded-md">로그인</li></Link>
                <Link to="/signup"><li className="bg-pink-500 text-white px-4 py-1 rounded-md">회원가입</li></Link>
                </>
            }
        </ul>
    </nav>
}
