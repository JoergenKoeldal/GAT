import React from "react";
import PropTypes from "prop-types";

function EmailList({ emails }) {
    const emailElements = [];

    emails?.forEach((e) => {
        emailElements.push(
            <h5 key={e.id}>
                {e.subject}
            </h5>,
        );
    });

    return (
        <div>
            {emailElements}
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
