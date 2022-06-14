import React, {
    useState, useEffect,
} from "react";

import { getKeywordLists } from "../apiService";
import Collapsible from "../util/collapsible";
import Spinner from "../util/spinner";
import Tag from "../util/tag";

export default function KeywordListCheckBox({ onChange }) {
    const [keywordList, setKeywordList] = useState([]);
    const [checkBoxChecked, setcheckBoxState] = useState([]);

    useEffect(() => {
        const fetchkeywordList = async () => {
            const keywords = await getKeywordLists();
            setKeywordList(keywords);
        };
        fetchkeywordList();
    }, []);

    const checkboxes = [];
    keywordList.forEach((e) => {
        checkboxes.push(
            <div key={e.name} className="flex my-2">
                <input className="w-5 h-5 mr-2" type="checkbox" value={e.name} checked={checkBoxChecked.includes(e.name)} onChange={checkBoxState} />
                <Collapsible buttonTitle={e.name} initiallyCollapsed>
                    <div className="flex space-x-2">
                        {e.keywords.map((k) => (
                            <Tag key={k}>
                                {k}
                            </Tag>
                        ))}
                    </div>
                </Collapsible>
            </div>,
        );
    });

    function checkBoxState(evt) {
        let newCheckBoxState;

        if (evt.target.checked) {
            // Tager checkbox staten, pakker alle elementerne ud (de 3 punktummer), og til sidst s�ttes det sidste element p�
            newCheckBoxState = [...checkBoxChecked, evt.target.value];
        } else {
            // Filtrere den ikke markerede listes navne fra
            newCheckBoxState = checkBoxChecked.filter((c) => c != evt.target.value);
        } setcheckBoxState(newCheckBoxState);

        let keywords = [];
        keywordList.filter((l) => newCheckBoxState.includes(l.name))
            .forEach((l) => keywords = [...keywords, ...l.keywords]);

        onChange(keywords);
    }

    if(checkboxes.length === 0){
        return(
            <div>
                <Spinner/>
            </div>
        )
    }

    return (
        <div>
            {checkboxes}
        </div>
    );
}
