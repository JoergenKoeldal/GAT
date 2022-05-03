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

const appContext = createContext();

export function useAppContext(){
    return useContext(appContext);
}

export default function ProvideAppContext({children}){
    const { instance, accounts, inProgress } = useMsal();

    const [user, setUser] = useState(undefined);
    const [error, setError] = useState(undefined);

    // // Used by the Graph SDK to authenticate API calls
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        instance,
        {
            account: instance.getActiveAccount(),
            scopes: config.scopes,
            interactionType: InteractionType.Popup
        }
    );

    console.log("HERER");

    useEffect(() => {
        const checkUser = async() => {
            // console.log("user before", user);
            if(inProgress === InteractionType.None && accounts.length > 0){
                if(user){
                    return;
                }
                console.log("user", user);
                try {
                    // Check if user is already signed in
                    const account = instance.getActiveAccount();
                    console.log("ACC", account);
                    if (account) {
                    // // Get the user from Microsoft Graph
                        const user = await getUser(authProvider);
                        console.log("user after", user);

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
    }, [inProgress, accounts, instance, user])

    const displayError = (message, debug) => {
        setError({message, debug});
    }

    const clearError = () => {
        setError(undefined);
    }


    const signIn = async () => {
        await instance.loginPopup({
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
        await instance.loginPopup();
        setUser(undefined);
    };

    const auth = {
        user,
        error,
        signIn,
        signOut,
        displayError,
        clearError,
        // authProvider
    };
    
    return (
        <appContext.Provider value={auth}>
            {children}
        </appContext.Provider>
    );
}
