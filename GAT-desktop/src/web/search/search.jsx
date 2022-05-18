import React, {
    useState,
} from "react";

import {
    Routes,
    Route,
} from "react-router-dom";

import { useAppContext } from "../appContext";
import { getUserMails } from "../graphService";
import Button from "../util/button";
import Collapsible from "../util/collapsible";
import EmailList from "./emailList";
import KeywordListCheckBox from "./keywordCheckBox";
import SourceCheckBox from "./sourceCheckBox";

export default function Search() {
    const appContext = useAppContext();
    const [emails, setEmails] = useState([]);
    const [searchString, setSearchString] = useState("body: cv");

    const fetchEmails = (evt) => {
        evt.preventDefault();
        getUserMails(appContext.user, { search: searchString })
            .then((res) => {
                setEmails(res.value);
            });
    };

    return (
        <div>
            
            <form className="flex flex-row" onSubmit={fetchEmails}>
                <input className="shadow border w-full rounded py-2 px-3 text-gray-700 focus:color-blue-800 mr-2" type="text" value={searchString} onInput={(evt) => setSearchString(evt.target.value)} />
                <Button isSubmit>
                    Søg mails
                </Button>
               
            </form>
            <Collapsible buttonTitle="GDPR Søgning" >
                <p className="font-bold">Vælg hvilke områder der skal søges på</p>
                <br />
                <SourceCheckBox />
                <br />
                <p className="font-bold">Templates til søgning</p>
                <KeywordListCheckBox />

            </Collapsible>


            <EmailList emails={emails} />
            <div className="w-full">
                <div className="w-1/2 border-r-2 border-gray-200 overflow-auto">
                    <EmailList emails={emails} />
                </div>
                <div className="w-1/2">
                    
                </div>
            </div>
        </div>
    );
}
