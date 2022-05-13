import React, {
    useState,
} from "react";

import { useAppContext } from "../appContext";
import { getUserMails } from "../graphService";
import Button from "../util/button";
import EmailList from "./emailList";

export default function Search() {
    const appContext = useAppContext();
    const [emails, setEmails] = useState([]);
    const [searchString, setSearchString] = useState("body:cv OR subject:cbb");

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
            <EmailList emails={emails} />
        </div>
    );
}
