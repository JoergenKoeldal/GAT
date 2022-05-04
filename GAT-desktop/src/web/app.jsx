import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import PropTypes from "prop-types";

import "./assets/style.css"; // import css, required by tailwindcss

import { MsalProvider } from "@azure/msal-react";
import ProvideAppContext from "./appContext";
import Navbar from "./navbar";
import Search from "./search/search";
import Statistics from "./statistics/statistics";

function App({ pca }) {
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
                </BrowserRouter>
                ,
            </ProvideAppContext>
        </MsalProvider>
    );
}

App.propTypes = {
    pca: PropTypes.instanceOf(Object).isRequired,
};

export default App;
