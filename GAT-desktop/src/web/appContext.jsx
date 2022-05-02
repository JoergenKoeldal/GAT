import {useMsal} from "@azure/msal-react";
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType} from '@azure/msal-browser';
import React, {
    useContext,
    createContext,
    useState,
    useEffect,
} from "react";

import config from "./config";
import { getUser } from "./graphService.js";

const appContext = createContext({
  user: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  displayError: undefined,
  clearError: undefined,
  authProvider: undefined
});

export function useAppContext(){
    return useContext(appContext);
}

function useProvideAppContext() {
    const msal = useMsal();

    const [user, setUser] = useState(undefined);
    const [error, setError] = useState(undefined);

    const displayError = (message, debug) => {
        setError({message, debug});
    }

    const clearError = () => {
        setError(undefined);
    }

    // Used by the Graph SDK to authenticate API calls
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msal.instance,
        {
            account: msal.instance.getActiveAccount(),
            scopes: config.scopes,
            interactionType: InteractionType.Popup
        }
    );

    const signIn = async () => {
        const result = await msal.instance.loginPopup({
            scopes: config.scopes,
            prompt: 'select_account'
        });
        const user = await getUser(authProvider)
        setUser({
            displayName: user.displayName || '',
            email: user.mail || user.userPrincipalName || '',
            timeFormat: user.mailboxSettings?.timeFormat || '',
            timeZone: user.mailboxSettings?.timeZone || 'UTC'
        })
    };

    const signOut = async () => {
        await msal.instance.loginPopup();
        setUser(undefined);
    };

    useEffect(() => {
        const checkUser = async() => {
            if (!user) {
                try {
                    // Check if user is already signed in
                    const account = msal.instance.getActiveAccount();
                    if (account) {
                    // Get the user from Microsoft Graph
                        const user = await getUser(authProvider);

                        setUser({
                            displayName: user.displayName || '',
                            email: user.mail || user.userPrincipalName || '',
                            timeFormat: user.mailboxSettings?.timeFormat || 'h:mm a',
                            timeZone: user.mailboxSettings?.timeZone || 'UTC'
                        });
                    }
                } catch (err) {
                    alert(err);
                }
            }
        };
        checkUser();
    })

    return {
        user,
        error,
        signIn,
        signOut,
        displayError,
        clearError,
        authProvider
    };
}

export default function ProvideAppContext({children}){
    const auth = useProvideAppContext();
    return (
        <appContext.Provider value={auth}>
            {children}
        </appContext.Provider>
    );
}
