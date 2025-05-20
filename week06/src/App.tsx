import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SignInPage} from "./page/SignInPage.tsx";
import {SignUpPage} from "./page/SignUpPage.tsx";
import {LpsPage} from "./page/LpsPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { RootLayout } from './page/RootLayout.tsx';
import {ProtectedRoot} from "./page/protected/ProtectedRoot.tsx";
import { LpRecordPage } from './page/protected/LpRecordPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <LpsPage/>
            },
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
        element: <ProtectedRoot/>,
        children: [
            {
                path: '/lp/:id',
                element: <LpRecordPage />
            }
        ]
    }
])

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
