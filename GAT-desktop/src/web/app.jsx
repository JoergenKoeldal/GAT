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
import Login from "./login/login";
import NotFound from "./notFound/notFound";

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
                                element={<NotFound />}
                            />
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </ProvideAppContext>
        </MsalProvider>
    );
}

App.propTypes = {
    pca: PropTypes.instanceOf(Object).isRequired,
};

export default App;
