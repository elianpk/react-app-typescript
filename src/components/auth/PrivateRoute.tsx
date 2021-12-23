import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "./SessionContext";


export default function PrivateRoute() {
    const [session] = useSessionContext();

    return session.isAuth ? <Outlet /> : <Navigate to="/login" />;
}