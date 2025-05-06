import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SignInPage} from "./page/SignInPage.tsx";
import {SignUpPage} from "./page/SignUpPage.tsx";
import {LpsPage} from "./page/LpsPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { RootLayout } from './page/RootLayout.tsx';

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
