import React, {useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import "./assets/style.css"; // import css, required by tailwindcss

import { MsalProvider } from "@azure/msal-react";
import ProvideAppContext from "./appContext";
import Navbar from "./navbar";
import Search from "./search/search";
import Statistics from "./statistics/statistics";

function App({ msalInstance }) {
    return (
        <MsalProvider instance={msalInstance}>
            <ProvideAppContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route path="/search" element={<Search />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/C:/search" element={<Search />} />
                            <Route path="/C:/statistics" element={<Statistics />} />
                            <Route path="*"/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ProvideAppContext>
        </MsalProvider>
    );
}

export default App;
