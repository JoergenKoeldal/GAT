import React from "react";
import PropTypes from "prop-types";

function Email({ email }) {
    return (
        <div>
            <span className="text-sm font-bold">
                { email.subject }
            </span>
            <div />
        </div>
    );
}

Email.propTypes = {
    email: PropTypes.instanceOf(Object).isRequired,
};

function EmailList({ emails: results }) {
    const elements = [];

    results?.forEach((e) => {
        elements.push(
            <Email key={e.id} email={e} />,
        );
    });

    return (
        <div>
            {elements}
        </div>
    );
}

EmailList.propTypes = {
    emails: PropTypes.instanceOf(Array),
};

EmailList.defaultProps = {
    emails: [],
};

export default EmailList;
