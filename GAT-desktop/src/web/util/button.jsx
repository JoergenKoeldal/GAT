import React from "react";
import PropTypes from "prop-types";

function Button({
    onClick, children, isSubmit, className, color, size,
}) {
    let classes = "";
    switch (color) {
        case "green":
            classes = "bg-emerald-700 text-white hover:bg-emerald-800";
            break;
        case "red":
            classes = "bg-red-700 text-white hover:bg-red-800";
            break;
        case "stone":
        default:
            classes = "bg-stone-500 text-white hover:bg-stone-600";
    }
    switch (size) {
    case "lg":
        classes += " text-lg p-2";
        break;
    case "sm":
        classes += " text-sm p-1";
        break;
    case "xs":
        classes += " text-xs p-1";
        break;
    case "md":
    default:
        classes += " text-md p-2";
    }
    classes += ` rounded ${className}`;
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
