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
    const [collapsibleStates, setCollapsibleStates] = useState({form: false, email: true});
    const [searchString, setSearchString] = useState("");

    const fetchEmails = () => {
        const search = searchString.split(" ").reduce((wholeSearch, currentword) => {
            return wholeSearch + `body: ${currentword} OR subject: ${currentword} OR `;
        }, "")
        //Tager længden af stringen og fjerner de sidste 4 characters for at undgå problemet med OR i slutningen af stringen
        getUserMails(appContext.user, { search: search.substring(0, search.length - 4) })
            .then((res) => {
                setEmails(res.value);
            });
        setCollapsibleStates({...collapsibleStates, form:true, email: false});
    };

    return (
        <div className="">
            <Button className={"float-right"} isSubmit onClick={() => fetchEmails()}>
                Søg
            </Button>
            <Collapsible collapsed={collapsibleStates.form} onCollapse={(c) => setCollapsibleStates({...collapsibleStates, form: c})} buttonTitle="GDPR Søgning" >
                <p className="font-bold">Vælg hvilke områder der skal søges på</p>
                <br />
                <SourceCheckBox />
                <br />
                <p className="font-bold">Templates til søgning</p>
                <KeywordListCheckBox onChange={(keywords) => setSearchString(keywords.join(" "))} />
            </Collapsible>

            <Collapsible buttonTitle="Email" collapsed={collapsibleStates.email} onCollapse={(c) => setCollapsibleStates({...collapsibleStates, email: c})} >
                <div className="w-full flex max-h-screen">
                    <div className="w-1/2 border-r-2 border-gray-200 overflow-y-scroll">
                        {emails?.map((r) => (
                            <div className="hover:bg-gray-200 cursor-pointer" key={r.id} onClick={() => setSelectedResult(r)}>
                                <SearchResult
                                    subject={r.subject}
                                    body={r.body.content}
                                    search={r.search}
                                    preview
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-1/2 ml-2 overflow-y-scroll">
                        <SearchResult
                            subject={selectedResult?.subject}
                            body={selectedResult?.body?.content}
                            search={selectedResult?.search}
                            preview={false}
                        />
                    </div>
                </div>
            </Collapsible>
        </div>
    );
}
