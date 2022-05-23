import React from "react";

export default function SourceCheckBox({ sources, onChange }) {
    sources = sources === undefined ? [] : sources;

    const checkboxes = [];
    sources.forEach((e) => {
        checkboxes.push(
            <label key={e.sourceId}>
                {e.name}
                <input type="checkbox" value={e.name} checked={e.checked} onChange={() => onChange(e)} />
            </label>,
        );
    });

    return (
        <div>
            {checkboxes}
        </div>
    );
}
