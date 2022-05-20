import React, { useState } from "react";

import Button from "./button";

export default function Collapsible({ children, buttonTitle, collapsed, onCollapse }) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    function collaps() {
        collapsed = undefined;
        setIsCollapsed(!isCollapsed)
        if (onCollapse) {
            onCollapse(isCollapsed);
        }
    }

    const contentStyle = {};

    const actuallyCollapsed = collapsed !== undefined ? collapsed : isCollapsed;

    if (actuallyCollapsed) {
        contentStyle.display = "none";
    } else {
        contentStyle.display = "block";
    }

    return (

        <div>

            <Button className="collapsible" onClick={() => collaps()}>
                {buttonTitle}
            </Button>

            <div style={contentStyle}>
                {" "}
                {children}
            </div>
        </div>

    );
}
