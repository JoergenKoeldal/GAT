import React from "react";
import { useAppContext } from "../appContext";
import { getUserMails } from "../graphService";
import Button from "../util/button";


export default function Search() {
    // const appContext = useAppContext();
    // console.log(getUserMails(appContext.user));

    return (
        <div>
            Search page!
            <Button onClick={() => console.log(getUserMails(appContext.user))}>
                Hent mails
            </Button>
            
        </div>
    );
}
