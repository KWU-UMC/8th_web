import './index.css'
import {createBrowserRouter, Link, Outlet, RouterProvider} from "react-router-dom";
import {SignInPage} from "./page/SignInPage.tsx";
import {SignUpPage} from "./page/SignUpPage.tsx";

const RootLayout = () => {
    return (
        <>
            <nav className="w-full flex justify-between px-36 py-4 border-b border-neutral-500 items-center">
                <p>TITLE</p>
                <ul className="flex gap-4">
                    <Link to="/login"><li className="bg-neutral-400 text-white px-4 py-1 rounded-md">로그인</li></Link>
                    <Link to="/signup"><li className="bg-pink-500 text-white px-4 py-1 rounded-md">회원가입</li></Link>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '/login',
                element: <SignInPage/>
            },
            {
                path: '/signup',
                element: <SignUpPage/>
            }
        ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
