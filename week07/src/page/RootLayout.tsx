import {Navigation} from "./Navigation.tsx";
import {Link, Outlet} from "react-router-dom";
import {useState} from "react";

const SideBar = () => {
    return <div className="h-full flex flex-col bg-neutral-800 py-8">
        <ul className="flex flex-1 flex-col gap-4 px-4 w-70">
            <li className="text-white text-lg">찾기</li>
            <Link to='/my'><li className="text-white text-lg">마이페이지</li></Link>
        </ul>

        <div><span className="text-white text-lg px-4">탈퇴하기</span></div>
    </div>
}

export const RootLayout = () => {
    const [isVisible, setVisible] = useState(false);

    return (
        <div className="flex flex-col w-screen h-screen">
            <Navigation onClickHamburger={() => setVisible(v => !v)} />

            <div className="relative block md:hidden">
                <div className="absolute top-0 left-0 my-4">
                    <Outlet />
                </div>

                <div
                    className={`${isVisible ? 'block' : 'hidden'} fixed inset-0 bg-black/50 z-5 transition-opacity`}
                    onClick={() => setVisible(false)} />

                <div className={`fixed h-screen top-0 left-0 ${isVisible ? 'visible opacity-100 w-70' : 'invisible opacity-0 w-0'} z-10 transition-width duration-150 ease-in-out`}>
                    <SideBar/>
                </div>
            </div>

            <div className="hidden md:flex flex-1 min-h-0">
                <SideBar/>

                <div className="flex-1 min-h-0 h-full p-4 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
