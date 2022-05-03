import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import "./assets/style.css"; // import css, required by tailwindcss

import ProvideAppContext from "./appContext";
import Navbar from "./navbar";
import Search from "./search/search";
import Statistics from "./statistics/statistics";
import {MsalProvider} from "@azure/msal-react";

export default function App({ pca }){
    return (
        <MsalProvider instance={pca}>
            <ProvideAppContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route path="/" element={<Search />} />
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
