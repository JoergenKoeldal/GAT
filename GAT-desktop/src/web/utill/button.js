import React from "react";

export default function Button(props) {
    return (
        <button style={{ color: "red", backgroundColor: "turquoise" }} onClick={props.onClick}>
            {" "}
            {props.text}
            {" "}
        </button>
    );
}
