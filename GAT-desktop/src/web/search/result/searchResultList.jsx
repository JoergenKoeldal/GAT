import React from "react";
import SearchResult from "./searchResult";

export default function SearchResultList({ results }) {
    return (
        <div>
            {results?.map((r) => (
                <SearchResult
                    key={r.id}
                    subject={r.subject}
                    body={r.body.content}
                    search={r.search}
                    preview
                />
            ))}
        </div>
    );
}
