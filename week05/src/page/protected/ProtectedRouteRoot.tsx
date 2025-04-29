import '../../index.css'
import {Outlet} from "react-router-dom";
import {Navigation} from "../Navigation.tsx";

export const ProtectedRouteRoot = () => {
    return <>
        <Navigation />

        <Outlet/>
    </>
}
