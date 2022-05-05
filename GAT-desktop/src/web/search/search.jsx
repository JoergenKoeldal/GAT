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
    const [searchString, setSearchString] = useState("");

    const fetchEmails = (evt) => {
        evt.preventDefault();
        getUserMails(appContext.user, { search: searchString })
            .then((res) => {
                setEmails(res.value);
            });
    };

    return (
        <div>
            Search page!
            <form className="flex flex-row" onSubmit={fetchEmails}>
                <input className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" type="text" value={searchString} onInput={(evt) => setSearchString(evt.target.value)} />
                <Button isSubmit>
                    Søg mails
                </Button>
            </form>
            <EmailList emails={emails} />
        </div>
    );
}
