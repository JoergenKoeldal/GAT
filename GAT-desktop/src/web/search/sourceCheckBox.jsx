import React, {
    useState, useEffect
} from "react";


import { getSources } from "../apiService";


export default function SourceCheckBox() {

    const [sources, setSources] = useState([])
    const [checkBoxChecked, setcheckBoxState] = useState([]);

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
                <input type="checkbox" value={e.name} checked={checkBoxChecked.includes(e.name + "")} onChange={checkBoxState} />
        </label>)
    })


    function checkBoxState(evt) {

        if (evt.target.checked) {
            //Tager checkbox staten, pakker alle elementerne ud (de 3 punktummer), og til sidst sættes det sidste element på
            setcheckBoxState([...checkBoxChecked, evt.target.value])
        } else {
            //Filtrere den ikke markerede listes navne fra
            setcheckBoxState(checkBoxChecked.filter((c) => c != evt.target.value))
        }

    }

    console.log(checkBoxChecked);


    return (
        <div>
            {checkboxes}
        </div>
    )
    }



