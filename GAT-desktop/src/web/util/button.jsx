import React from "react";
import PropTypes from "prop-types";

function Button({ onClick, children }) {
    return (
        <button className="rounded bg-blue-700 text-white p-2" type="button" onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any
};

export default Button;
