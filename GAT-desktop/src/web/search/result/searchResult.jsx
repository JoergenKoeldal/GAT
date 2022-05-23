import React from "react";
import Button from "../../util/button";
import ResultBody from "./resultBody";
import ResultSubject from "./resultSubject";

export default function SearchResult({
    subject, body, search, preview,
}) {
    return (
        <div>
            <ResultSubject subject={subject} highlightIndexes={search?.subject} />
            {preview
                ? ""
                : <ResultBody body={body} highlightIndexes={search?.body} preview={preview} /> }
        </div>
    );
}
