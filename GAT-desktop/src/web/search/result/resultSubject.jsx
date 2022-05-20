import React from "react";

export default function ResultSubject({ subject, highlightIndexes }) {
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
        </div>
    );
}
