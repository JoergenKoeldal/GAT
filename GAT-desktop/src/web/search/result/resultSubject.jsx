import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function ResultSubject({ subject, hasAttachments, highlightIndexes }) {
    if (!subject) {
        return "";
    }
    const subjectElements = [];
    let currentIndex = 0;
    let key = 0;
    highlightIndexes?.forEach(({ start, stop }) => {
        subjectElements.push(
            <span key={key}>
                {subject.substring(currentIndex, start)}
            </span>,
        );
        key++;
        subjectElements.push(
            <span className="bg-yellow-300" key={key}>
                {subject.substring(start, stop)}
            </span>,
        );
        key++;
        currentIndex = stop;
    });
    if (currentIndex !== subject.length - 1) {
        subjectElements.push(
            <span key={key}>
                {subject.substring(currentIndex, subject.length)}
            </span>,
        );
    }

    return (
        <div className="font-bold">
            {subjectElements}
            {hasAttachments ? <FontAwesomeIcon className="float-right pt-1 pr-2" size="1x" icon={faPaperclip}/> : ""}
        </div>
    );
}
