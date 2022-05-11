import React from "react";
import PropTypes from "prop-types";

function EmailBodyPreview({ body, highlightIndexes }) {
    const bodyElements = [];
    let currentIndex = 0;
    highlightIndexes?.forEach(({ start, stop }) => {
        bodyElements.push(
            <span key={currentIndex}>
                {body.substring(start - 30, start)}
            </span>,
        );
        bodyElements.push(
            <span className="bg-yellow-300" key={start}>
                {body.substring(start, stop)}
            </span>,
        );
        currentIndex = stop;
    });
    return (
        <p>
            { bodyElements }
        </p>
    );
}

EmailBodyPreview.propTypes = {
    body: PropTypes.string.isRequired,
    highlightIndexes: PropTypes.instanceOf(Array).isRequired,
};

export default EmailBodyPreview;
