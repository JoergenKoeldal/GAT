import React from "react";
import PropTypes from "prop-types";

function EmailSubject({ subject, highlightIndexes }) {
    const subjectElements = [];
    let currentIndex = 0;
    highlightIndexes?.forEach(({ start, stop }) => {
        subjectElements.push(
            <span key={currentIndex}>
                {subject.substring(currentIndex, start)}
            </span>,
        );
        subjectElements.push(
            <span className="bg-yellow-300" key={start}>
                {subject.substring(start, stop)}
            </span>,
        );
        currentIndex = stop;
    });
    if (currentIndex !== subject.length - 1) {
        subjectElements.push(
            <span key={currentIndex}>
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

EmailSubject.propTypes = {
    subject: PropTypes.string.isRequired,
    highlightIndexes: PropTypes.instanceOf(Array).isRequired,
};

export default EmailSubject;
