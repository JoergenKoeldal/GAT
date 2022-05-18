import React, {
    useState, useEffect
} from "react";


import { getSources } from "../apiService";


export default function SourceCheckBox() {

    const [sources, setSources] = useState([])

    useEffect(() =>  {
        const fetchSources = async () => {
            const sources = await getSources();
            setSources(sources)
        };
        fetchSources();
    }, []);

    const checkboxes = [];
    sources.forEach((e) => {
        checkboxes.push(
            <label key={e.sourceId}>
                {e.name}
            <input type="checkbox" value={e.sourceId} />
        </label>)
	})

    return (
        <div>
            {checkboxes}
        </div>
    )
    }



