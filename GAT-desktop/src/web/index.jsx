import ReactDOM from "react-dom/client";
import React from "react";

import {
    PublicClientApplication,
    EventType
} from '@azure/msal-browser';

import config from './config';
import App from "./app";

import "./assets/style.css"; // import css, required by tailwindcss

const msalInstance = new PublicClientApplication({
    auth: {
        clientId: config.clientId,
        redirectUri: config.redirectUri
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    }
});

// Check if there are already accounts in the browser session
// If so, set the first account as the active account
const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        // Set the active account - this simplifies token acquisition
        const authResult = event.payload;
        msalInstance.setActiveAccount(authResult.account);
    }
});

const container = document.getElementById("app");

const root = ReactDOM.createRoot(container);

console.log("instalnce index.js", msalInstance);
root.render(
    <App pca = { msalInstance }/>
);
