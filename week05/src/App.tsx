import './index.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {SignInPage} from "./page/SignInPage.tsx";
import {SignUpPage} from "./page/SignUpPage.tsx";
import {ProtectedRouteRoot} from "./page/protected/ProtectedRouteRoot.tsx";
import {PremiumWebtoon} from "./page/protected/PremiumWebtoon.tsx";
import {Navigation} from "./page/Navigation.tsx";

const RootLayout = () => {
    return (
        <>
            <Navigation />

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
    },
    {
        path: '/',
        element: <ProtectedRouteRoot />,
        children: [
            {
                path: '/premium/webtoon/:id',
                element: <PremiumWebtoon />
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
