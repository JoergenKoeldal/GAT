import React from "react";
import { Outlet, Link } from "react-router-dom";

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import { useAppContext } from "./appContext";

export default function Navbar() {
    const appContext = useAppContext();
    const user = app.user || {displayName: "", email: "",};

    return (
        <div>
            <h1 className="bg-red-900">GAT</h1>
            <nav>
                <Link to="/home">home</Link>
                {" "}
                |
                {" "}
                <Link to="/statistics">statistik</Link>
            </nav>
            <AuthenticatedTemplate>
                <Outlet />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={appContext.signIn}>
                    Log ind
                </button>
            </UnauthenticatedTemplate>
        </div>
    );
}
