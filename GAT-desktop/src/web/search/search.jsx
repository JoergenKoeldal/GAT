import React, {
    useState,
} from "react";

import { useAppContext } from "../appContext";
import { getUserMails } from "../graphService";
import Button from "../util/button";
import Collapsible from "../util/collapsible";
import KeywordListCheckBox from "./keywordCheckBox";
import SourceCheckBox from "./sourceCheckBox";
import SearchResult from "./result/searchResult";

export default function Search() {
    const appContext = useAppContext();
    const [emails, setEmails] = useState([]);
    const [selectedResult, setSelectedResult] = useState({});
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


            <div className="w-full flex">
                <div className="w-1/2 border-r-2 border-gray-200 overflow-auto">
                    {emails?.map(r => {
                        return (
                            <div className="hover:bg-gray-200 cursor-pointer" key={r.id} onClick={() => setSelectedResult(r)}>
                                <SearchResult 
                                    subject={r.subject} 
                                    body={r.body.content} 
                                    search={r.search}
                                    preview={true}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="w-1/2 ml-2">
                    <SearchResult 
                        subject={selectedResult?.subject} 
                        body={selectedResult?.body?.content} 
                        search={selectedResult?.search}
                        preview={false}
                    />
                </div>
            </div>
        </div>
    );
}
