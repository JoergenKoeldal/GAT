import React from "react";
import PropTypes from "prop-types";

function Button({ onClick, children, isSubmit, className }) {
    const classes = "rounded bg-blue-700 text-white p-2 hover:bg-blue-800 " + className;
    return (
        <button className={classes} type={isSubmit ? "submit" : "button"} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.string,
    isSubmit: PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => {},
    children: [],
    isSubmit: false,
};

export default Button;
