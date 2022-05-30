import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Collapsible({
    children, initiallyCollapsed, buttonTitle, collapsed, onCollapse, bordered,
}) {
    const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed || false);
    bordered = bordered === undefined ? false : bordered;

    function collaps() {
        if (collapsed !== undefined) {
            onCollapse(!collapsed);
        } else {
            setIsCollapsed(!isCollapsed);
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
        <div className={bordered ? "border-2 border-gray-200 p-2 my-2 bg-gray-50" : ""}>
            <div className="w-full cursor-pointer" onClick={() => collaps()}>
                <span className="mr-2">
                    {buttonTitle}
                </span>
                { (actuallyCollapsed
                    ? <FontAwesomeIcon size="1x" icon={faAngleDown} />
                    : <FontAwesomeIcon size="1x" icon={faAngleUp} />
                )}
            </div>
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
}
