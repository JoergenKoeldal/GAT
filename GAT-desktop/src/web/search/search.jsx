import React, {
    useState, useEffect,
} from "react";

import { useAppContext } from "../appContext";
import { deleteUserMail, getUserMails } from "../graphService";
import Button from "../util/button";
import Collapsible from "../util/collapsible";
import KeywordListCheckBox from "./keywordCheckBox";
import SourceCheckBox from "./sourceCheckBox";
import SearchResult from "./result/searchResult";

import { getSources } from "../apiService";

export default function Search() {
    const appContext = useAppContext();
    const [emails, setEmails] = useState([]);
    const [selectedResult, setSelectedResult] = useState({});
    const [collapsibleStates, setCollapsibleStates] = useState({
        form: false, email: true, cdrive: true, teams: true, skype: true,
    });
    const [searchString, setSearchString] = useState("");
    const [sources, setSources] = useState([]);

    const fetchEmails = () => {
        const search = searchString.split(" ").reduce((wholeSearch, currentword) => `${wholeSearch}body: ${currentword} OR subject: ${currentword} OR `, "");
        // Tager længden af stringen og fjerner de sidste 4 characters for at undgå problemet med OR i slutningen af stringen
        getUserMails(appContext.user, { search: search.substring(0, search.length - 4) })
            .then((res) => {
                setEmails(res.value);
            });
        setCollapsibleStates({ ...collapsibleStates, form: true, email: false });
    };

    const checkSource = (checkedSource) => {
        const newSources = [];
        sources.forEach((s) => {
            newSources.push({
                ...s,
                checked: s.sourceId === checkedSource.sourceId ? !s.checked : s.checked,
            });
        });
        setSources(newSources);
    };

    useEffect(() => {
        const fetchSources = async () => {
            const sources = await getSources();
            setSources(sources);
        };
        fetchSources();
    }, []);

    const deleteEmal = (id) => {
        deleteUserMail(appContext.user, id)
            .then((res) => {
                if (res) {
                    setEmails(emails.filter((e) => e.id !== id));
                }
            });
    };

    const shouldSourceRender = (name) => sources.find((e) => e.name === name)?.checked && emails.length > 0;

    const renderEmailCheckBox = () => {
        if (!shouldSourceRender("Email")) {
            return "";
        }
        return (
            <Collapsible 
                bordered={true} 
                buttonTitle="Email" 
                collapsed={collapsibleStates.email} 
                onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, email: c })}
            >
                <div className="w-full flex max-h-screen">
                    <div className="w-1/2 border-r-2 border-gray-200 overflow-y-scroll">
                        {emails?.map((r) => (
                            <div className="flex py-1" key={r.id}>
                                <Button color="red" size="xs" onClick={() => deleteEmal(r.id)}>Slet</Button>
                                <div className="hover:bg-gray-200 cursor-pointer pl-2 w-full" key={r.id} onClick={() => setSelectedResult(r)}>
                                    <SearchResult
                                        subject={r.subject}
                                        body={r.body.content}
                                        search={r.search}
                                        preview
                                    />
                                </div>
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
        );
    };

    return (
        <div className="">
            <Collapsible 
                collapsed={collapsibleStates.form} 
                onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, form: c })} 
                buttonTitle="GDPR Søgning"
                bordered={true}
            >
                <Button className="float-right" isSubmit onClick={() => fetchEmails()}>
                    Søg
                </Button>
                <p className="font-bold">Vælg hvilke områder der skal søges på</p>
                <br />
                <SourceCheckBox sources={sources} onChange={(i) => checkSource(i)} />
                <br />
                <p className="font-bold">Templates til søgning</p>
                <KeywordListCheckBox onChange={(keywords) => setSearchString(keywords.join(" "))} />
            </Collapsible>

            {renderEmailCheckBox()}

            {
                shouldSourceRender("C-drev")
                    ? 
                    <Collapsible 
                        bordered={true} 
                        buttonTitle="C-drev" 
                        collapsed={collapsibleStates.cdrive} 
                        onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, cdrive: c })} />
                    : ""
            }

            {
                shouldSourceRender("Teams")
                    ? 
                    <Collapsible 
                        bordered={true} 
                        buttonTitle="Teams" 
                        collapsed={collapsibleStates.teams} 
                        onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, teams: c })} />
                    : ""
            }
            {
                shouldSourceRender("Skype")
                    ? 
                    <Collapsible 
                        bordered={true} 
                        buttonTitle="Skype" 
                        collapsed={collapsibleStates.skype} 
                        onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, skype: c })} />
                    : ""
            }
        </div>
    );
}
