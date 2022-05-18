import React, {
    useState, useEffect
} from "react";


import { getKeywordLists } from "../apiService";
import Collapsible from "../util/collapsible";

export default function KeywordListCheckBox() {

    const [keywordList, setKeywordList] = useState([])

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
                <input type="checkbox" value={e.name} />
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


    return (
        <div>
            {checkboxes}
        </div>
    )
}