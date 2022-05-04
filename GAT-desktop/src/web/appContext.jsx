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
    const { instance, accounts, inProgress } = useMsal();

    const [user, setUser] = useState(undefined);
    // // Used by the Graph SDK to authenticate API calls
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        instance,
        {
            account: instance.getActiveAccount(),
            scopes: config.scopes,
            interactionType: InteractionType.Popup,
        },
    );

    useEffect(() => {
        const checkUser = async () => {
            // console.log("user before", user);
            if (inProgress === InteractionType.None && accounts.length > 0) {
                if (user) {
                    return;
                }
                try {
                    // Check if user is already signed in
                    const account = instance.getActiveAccount();
                    if (account) {
                    // // Get the user from Microsoft Graph
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
    }, [inProgress, accounts, instance, user]);

    const signIn = async () => {
        await instance.loginPopup({
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
        await instance.loginPopup();
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

function ProvideAppContext({ children }) {
    const auth = useProvideAppContext();
    return (
        <appContext.Provider value={auth}>
            {children}
        </appContext.Provider>
    );
}

ProvideAppContext.propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
};

export default ProvideAppContext;
