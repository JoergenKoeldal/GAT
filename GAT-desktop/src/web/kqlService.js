function parse(kqlString) {
    const pairs = kqlString.split(/OR|AND/);
    const kql = {};
    pairs.forEach((pair) => {
        let [key, val] = pair.split(":");
        key = key.trim().toLowerCase();
        val = val.trim().toLowerCase();
        if (Object.keys(kql).includes(key)) {
            kql[key].push(val);
        } else {
            kql[key] = [val];
        }
    });
    return kql;
}

export default function kqlSearch(kqlString, searchObj) {
    const kql = parse(kqlString);

    const result = {};

    let searchString;
    Object.keys(kql).forEach((key) => {
        if (searchObj[key] instanceof Object) {
            searchString = searchObj[key].content;
        } else {
            searchString = searchObj[key];
        }
        searchString = searchString.toLowerCase();
        kql[key].forEach((val) => {
            const indexes = [];
            let index = searchString.indexOf(val);
            while (index !== -1) {
                indexes.push(index);
                index = searchString.indexOf(val, index + 1);
            }
            if (indexes.length > 0) {
                if (Object.keys(result).includes(key)) {
                    result[key].push({
                        searchValue: val,
                        indexes,
                    });
                } else {
                    result[key] = [{
                        searchValue: val,
                        indexes,
                    }];
                }
            }
        });
    });
    return result;
}
