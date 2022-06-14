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

import {
    getJNDataUser, getSources, postCompleteGDPR, postSearch,
} from "../apiService";

export default function Search() {
    const appContext = useAppContext();
    const [emails, setEmails] = useState([]);
    const [selectedResult, setSelectedResult] = useState({});
    const [collapsibleStates, setCollapsibleStates] = useState({
        form: false, email: true, cdrive: true, teams: true, skype: true,
    });
    const [searchString, setSearchString] = useState("");
    const [searchStringCustom, setSearchStringCustom] = useState("");
    const [sources, setSources] = useState([]);
    const [user, setUser] = useState({});
    const [didSearch, setDidSearch] = useState(false);

    const fetchEmails = () => {
        let fullSearchString = searchString;
        if (searchStringCustom.length > 0) {
            fullSearchString += ` ${searchStringCustom}`;
        }
        const search = fullSearchString.split(" ").reduce((wholeSearch, currentword) => `${wholeSearch}body: ${currentword} OR subject: ${currentword} OR `, "");
        // Tager længden af stringen og fjerner de sidste 4 characters for at undgå problemet med OR i slutningen af stringen
        getUserMails(appContext.user, { search: search.substring(0, search.length - 4) })
            .then((res) => {
                setEmails(res.value);

                sources.forEach((s) => {
                    if (s.checked) {
                        const body = {
                            userId: user.userId,
                            sourceId: s.sourceId,
                            hits: s.name === "Email" ? res.value.length : 0,
                            deleted: 0,
                        };
                        postSearch(body);
                    }
                });
            });
        setCollapsibleStates({ ...collapsibleStates, form: true, email: false });
        setDidSearch(true);
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

    useEffect(() => {
        const fetchUser = () => {
            getJNDataUser(appContext.user?.email).then((u) => setUser(u));
        };
        fetchUser();
    }, [appContext.user]);

    const deleteEmal = (id, subject) => {
        if (!confirm(`Er du sikker på at du vil slette '${subject}'?`)) {
            return;
        }
        deleteUserMail(appContext.user, id)
            .then((res) => {
                if (res) {
                    setEmails(emails.filter((e) => e.id !== id));
                }
            });
    };

    const shouldSourceRender = (name) => sources.find((e) => e.name === name)?.checked && emails.length > 0;

    const renderNoSearchResults = () => {
        if(!shouldSourceRender("Email")
            && !shouldSourceRender("C-drev")
            && !shouldSourceRender("Teams")
            && !shouldSourceRender("Skype")
            && didSearch
        ){
            return (
                <div className="font-bold mx-auto">
                    Fandt ingen resultater, har du markeret et område at søge i? Ellers prøv at inkludere flere standard templates i din søgning.
                </div>
            );
        }
    }

    const renderEmailCheckBox = () => {
        if (!shouldSourceRender("Email")) {
            return "";
        }
        return (
            <Collapsible
                bordered
                buttonTitle="Email"
                collapsed={collapsibleStates.email}
                onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, email: c })}
            >
                <div className="w-full flex max-h-screen">
                    <div className="w-1/2 border-r-2 border-gray-200 overflow-y-scroll">
                        {
                            emails?.map((r) => {
                                let resultColor;
                                if (r.sortVal > 10) {
                                    resultColor = "hover:bg-red-200 bg-red-100";
                                } else if (r.sortVal > 5) {
                                    resultColor = "hover:bg-yellow-200 bg-yellow-100";
                                } else {
                                    resultColor = "hover:bg-gray-200 bg-gray-50 bg-white";
                                }

                                return (
                                    <div className="flex py-1" key={r.id}>
                                        <Button
                                            color="red"
                                            size="xs"
                                            onClick={() => deleteEmal(r.id, r.subject)}
                                        >
                                            Slet
                                        </Button>
                                        <div
                                            className={`${resultColor} cursor-pointer pl-2 w-full`}
                                            key={r.id}
                                            onClick={() => setSelectedResult(r)}
                                        >
                                            <SearchResult
                                                subject={r.subject}
                                                body={r.body.content}
                                                search={r.search}
                                                hasAttachments={r.hasAttachments}
                                                preview
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="w-1/2 ml-2 overflow-y-scroll">
                        <SearchResult
                            subject={selectedResult?.subject}
                            body={selectedResult?.body?.content}
                            search={selectedResult?.search}
                            hasAttachments={selectedResult?.hasAttachments}
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
                bordered
            >
                <Button
                    className="float-right"
                    color="green"
                    onClick={() => {
                        if (confirm("Er du sikker på at du vil færdiggøre din GDPR?")) {
                            postCompleteGDPR(user.userId);
                        }
                    }}
                >
                    Færdiggør GDPR
                </Button>
                <p className="font-bold">Vælg hvilke områder der skal søges på</p>
                <br />
                <SourceCheckBox sources={sources} onChange={(i) => checkSource(i)} />
                <br />
                <p className="font-bold">Templates til søgning</p>
                <KeywordListCheckBox onChange={(keywords) => setSearchString(keywords.join(" "))} />
                <label className="font-bold">
                    Brugerdefinerede søgeord:
                </label>
                <div className="flex">
                    <input className="w-full border-2 border-gray-200 p-1 mr-2 bg-white rounded" type="text" value={searchStringCustom} onChange={(evt) => setSearchStringCustom(evt.target.value)} />
                    <Button className="float-right" isSubmit onClick={() => fetchEmails()}>
                        Søg
                    </Button>
                </div>
            </Collapsible>

            {renderNoSearchResults()}

            {renderEmailCheckBox()}

            {
                shouldSourceRender("C-drev")
                    ? (
                        <Collapsible
                            bordered
                            buttonTitle="C-drev"
                            collapsed={collapsibleStates.cdrive}
                            onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, cdrive: c })}
                        />
                    )
                    : ""
            }

            {
                shouldSourceRender("Teams")
                    ? (
                        <Collapsible
                            bordered
                            buttonTitle="Teams"
                            collapsed={collapsibleStates.teams}
                            onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, teams: c })}
                        />
                    )
                    : ""
            }
            {
                shouldSourceRender("Skype")
                    ? (
                        <Collapsible
                            bordered
                            buttonTitle="Skype"
                            collapsed={collapsibleStates.skype}
                            onCollapse={(c) => setCollapsibleStates({ ...collapsibleStates, skype: c })}
                        />
                    )
                    : ""
            }
        </div>
    );
}
