import { useMsal } from "@azure/msal-react";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { InteractionType } from "@azure/msal-browser";
import React, {
    useContext,
    createContext,
    useState,
    useEffect,
} from "react";
import PropTypes from "prop-types";

import config from "./config";
import { getUser } from "./graphService";

const appContext = createContext();

function useProvideAppContext() {
    const { instance: msalInstance, accounts, inProgress } = useMsal();

    const [user, setUser] = useState(undefined);
    // // Used by the Graph SDK to authenticate API calls
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance,
        {
            account: msalInstance.getActiveAccount(),
            scopes: config.scopes,
            interactionType: InteractionType.Popup,
        },
    );

    useEffect(() => {
        const checkUser = async () => {
            if (inProgress === InteractionType.None && accounts.length > 0) {
                if (user) {
                    return;
                }
                try {
                    // Check if user is already signed in
                    const account = msalInstance.getActiveAccount();
                    if (account) {
                    // Get the user from Microsoft Graph
                        const u = await getUser(authProvider);

                        setUser({
                            displayName: u.displayName || "",
                            email: u.mail || u.userPrincipalName || "",
                            timeFormat: u.mailboxSettings?.timeFormat || "h:mm a",
                            timeZone: u.mailboxSettings?.timeZone || "UTC",
                        });
                    }
                } catch (err) {
                    alert(err);
                }
            }
        };
        checkUser();
    }, [inProgress, accounts, msalInstance]);

    const signIn = async () => {
        await msalInstance.loginRedirect({
            scopes: config.scopes,
            prompt: "select_account",
        });
        const u = await getUser(authProvider);
        setUser({
            displayName: u.displayName || "",
            email: u.mail || u.userPrincipalName || "",
            timeFormat: u.mailboxSettings?.timeFormat || "",
            timeZone: u.mailboxSettings?.timeZone || "UTC",
        });
    };

    const signOut = async () => {
        await msalInstance.logout();
        setUser(undefined);
    };

    return {
        user,
        signIn,
        signOut,
        authProvider,
    };
}

export function useAppContext() {
    return useContext(appContext);
}

export default function ProvideAppContext({ children }) {
    const auth = useProvideAppContext();
    return (
        <appContext.Provider value={auth}>
            {children}
        </appContext.Provider>
    );
}

