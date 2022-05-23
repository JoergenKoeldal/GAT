import React from "react";

export default function Tag({ children }) {
    return (
        <span className="rounded bg-gray-300 p-1">
            {children}
        </span>
    );
}
