import React from "react";
import PropTypes from "prop-types";
import Email from "./email/email";

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
