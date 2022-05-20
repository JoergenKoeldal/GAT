import React, { useState } from "react";

import Button from "./button";

export default function Collapsible({ children, initiallyCollapsed, buttonTitle, collapsed, onCollapse }) {

    const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed || false);

    function collaps() {
        if(collapsed !== undefined){
            onCollapse(!collapsed);
        }
        else{
            setIsCollapsed(!isCollapsed)
        }
    }

    const contentStyle = {};

    if (collapsed !== undefined ? collapsed : isCollapsed) {
        contentStyle.display = "none";
    } else {
        contentStyle.display = "block";
    }

    return (
        <div>
            <Button onClick={() => collaps()}>
                {buttonTitle}
            </Button>
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
}
