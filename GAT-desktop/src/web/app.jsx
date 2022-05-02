import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import "./assets/style.css"; // import css, required by tailwindcss

import ProvideAppContext from "./appContext";
import Navbar from "./navbar";
import Home from "./home/home";
import Statistics from "./statistics/statistics";
import {MsalProvider} from "@azure/msal-react";

export default function App({ pca }){
    console.log(pca);
    return (
        <MsalProvider instance={pca}>
            <ProvideAppContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route
                                path="*"
                                element={(
                                    <main style={{ padding: "1rem" }}>
                                        <p>There&apos;s nothing here!</p>
                                    </main>
                                )}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>,
            </ProvideAppContext>
        </MsalProvider>
    );
}
