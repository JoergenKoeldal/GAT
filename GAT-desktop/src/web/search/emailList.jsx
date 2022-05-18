import React from "react";
import PropTypes from "prop-types";
import Email from "./email/email";

import {
    Link
} from "react-router-dom";

function EmailList({ emails: results }) {
    const elements = [];

    results?.forEach((e) => {
        elements.push(
            <Link key={e.id} to={e.id}>
                <Email email={e} />
            </Link>
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
