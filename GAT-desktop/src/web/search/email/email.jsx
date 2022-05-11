import React from "react";
import PropTypes from "prop-types";
import EmailSubject from "./emailSubject";
import EmailBodyPreview from "./emailBodyPreview";

function Email({ email }) {
    return (
        <div>
            <EmailSubject subject={email.subject} highlightIndexes={email.search?.subject} />
            <EmailBodyPreview body={email.body.content} highlightIndexes={email.search?.body} />
        </div>
    );
}

Email.propTypes = {
    email: PropTypes.instanceOf(Object).isRequired,
};

export default Email;
