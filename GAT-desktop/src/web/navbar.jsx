import React from "react";
import { Outlet, Link } from "react-router-dom";

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import { useAppContext } from "./appContext";
import Button from "./util/button";

export default function Navbar() {
    const appContext = useAppContext();
    const user = app.user || {displayName: "", email: "",};

    return (
        <div>
            <nav className="bg-white border-gray-200 px-2 py-2.5 rounded">
                <div className="container flex flex-row justify-between items-center mx-auto">
                    <a className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">GAT</span>
                    </a>
                    <div className="w-full flex flex-row">
                        <div className="mx-auto">
                            <Link to="/" className="pr-4 pl-3 text-gray-700 hover:text-blue-800">Søg</Link>
                            <Link to="/statistics" className="pr-4 pl-3 text-gray-700 hover:text-blue-850">Statistik</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto">
                <AuthenticatedTemplate>
                    <Outlet />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Button onClick={appContext.signIn}>
                        Log ind
                    </Button>
                </UnauthenticatedTemplate>
            </div>
        </div>
    );
}
