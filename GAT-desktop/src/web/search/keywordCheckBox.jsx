import React, {
    useState, useEffect
} from "react";


import { getKeywordLists } from "../apiService";
import Collapsible from "../util/collapsible";

export default function KeywordListCheckBox({ onChange }) {

    const [keywordList, setKeywordList] = useState([])
    const [checkBoxChecked, setcheckBoxState] = useState([]);

    useEffect(() => {
        const fetchkeywordList = async () => {
            const keywordList = await getKeywordLists();
            setKeywordList(keywordList)
        };
        fetchkeywordList();
    }, []);

    const checkboxes = [];
    keywordList.forEach((e) => {
        checkboxes.push(
            <div key={e.name}>
            <label key={e.name} >
                    <input type="checkbox" value={e.name} checked={checkBoxChecked.includes(e.name)} onChange={ checkBoxState} />
                </label>
                <Collapsible buttonTitle={e.name}>
                    

                    <ul>
                        {e.keywords.map(k => {
                            return <li key={k}>{k} </li>
                        })}
                    </ul>
                       
                    </Collapsible>
                </div>
        )
    })

    function checkBoxState(evt) {

        let newCheckBoxState;

        if (evt.target.checked) {
            //Tager checkbox staten, pakker alle elementerne ud (de 3 punktummer), og til sidst sættes det sidste element på
            newCheckBoxState = [...checkBoxChecked, evt.target.value]
        } else {
            //Filtrere den ikke markerede listes navne fra
            newCheckBoxState = checkBoxChecked.filter((c) => c != evt.target.value)
        } setcheckBoxState(newCheckBoxState);

        let keywords = []
        keywordList.filter((l) => newCheckBoxState.includes(l.name))
            .forEach((l) => keywords = [...keywords, ...l.keywords])

        
        onChange(keywords)
       
    }




    return (
        <div>
            {checkboxes}
        </div>
    )
}