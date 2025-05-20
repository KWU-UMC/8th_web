import {RootLayout} from "../RootLayout.tsx";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
import {Navigate} from "react-router-dom";

export const ProtectedRoot = () => {
    const [accessToken] = useLocalStorage<string | null>('accessToken', null);
    const isSignedIn = accessToken !== null;

    if (!isSignedIn) return <Navigate to="/login" />

    return <>
        <RootLayout />
    </>
}
