import React from "react";

export default function ResultBody({ body, highlightIndexes, preview }) {
    if (!body) {
        return "";
    }
    let html = "";
    let currentIndex = 0;

    if(preview){
        highlightIndexes?.forEach(({ start, stop }) => {
            html += `
                ${body.substring(start - 30, start)}
                <span class="bg-yellow-300">
                    ${body.substring(start, stop)}
                </span>
            `;
            currentIndex = stop;
        });
    }
    else {
        highlightIndexes?.forEach(({ start, stop }) => {
            html += `
                ${body.substring(currentIndex, start)}
                <span class="bg-yellow-300">
                    ${body.substring(start, stop)}
                </span>
                `;
            currentIndex = stop;
        });
    }

    if (!preview && currentIndex !== body.length - 1) {
        html += `
            <span>
                ${body.substring(currentIndex, body.length)}
            </span>
        `;
    }

    return (
        <div className="flex flex-wrap" dangerouslySetInnerHTML={{ __html: html }}>
        </div>
    );
}
