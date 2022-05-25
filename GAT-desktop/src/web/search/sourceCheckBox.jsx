import React from "react";

export default function SourceCheckBox({ sources, onChange }) {
    sources = sources === undefined ? [] : sources;

    const checkboxes = [];
    sources.forEach((e) => {
        checkboxes.push(
            <label key={e.sourceId} className="mr-2">
                <input type="checkbox" className="w-5 h-5  mr-1" value={e.name} checked={e.checked} onChange={() => onChange(e)} />
                {e.name}
            </label>,
        );
    });

    return (
        <div>
            {checkboxes}
        </div>
    );
}
