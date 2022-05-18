import React from "react";

export default function ResultBody({ body, highlightIndexes, preview }) {
    if(!body){
        return "";
    }
    const bodyElements = [];
    let currentIndex = 0;

    highlightIndexes?.forEach(({ start, stop }) => {
        bodyElements.push(
            <span key={currentIndex}>
                { preview ? 
                    body.substring(start - 30, start) 
                    : 
                    body.substring(currentIndex, start)
                }
            </span>,
        );
        bodyElements.push(
            <span className="bg-yellow-300" key={start}>
                {body.substring(start, stop)}
            </span>,
        );
        currentIndex = stop;
    });
    if(!preview && currentIndex !== body.length - 1){
        bodyElements.push(
            <span key={currentIndex}>
                {body.substring(currentIndex, body.length)}
            </span>,
        )
    }

    return (
        <div className="flex flex-wrap">
            { bodyElements }
        </div>
    );
}

