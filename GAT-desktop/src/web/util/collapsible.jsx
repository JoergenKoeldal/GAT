import React, { useState } from "react";

import Button from "../util/button";




export default function Collapsible({ children, buttonTitle }) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    function collaps() {

        setIsCollapsed(!isCollapsed)

    }

    const contentStyle = {};

    if (isCollapsed) {
        contentStyle.display = "none";
    } else {
        contentStyle.display = "block";
    }


    return (

        <div>

            <Button className="collapsible" onClick={() => collaps()}>
                {buttonTitle}
            </Button>
            
            <div style={contentStyle}> {children}</div>
        </div>
        
    );



    
    }


