import React from "react";
import Button from "../util/button";
import { useAppContext } from "../appContext";

export default function Login() {
    const appContext = useAppContext();
    return (
        <div className="flex h-screen">
            <div className="m-auto p-5 shadow rounded-2xl">
                <h3 className="text-2xl font-bold">
                    Velkommen til dit GDPR Asistance Tool
                </h3>
                <div className="flex mt-5 justify-between items-center">
                    <span>
                        Klik her for at logge ind
                    </span>
                    <Button onClick={appContext.signIn}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}
