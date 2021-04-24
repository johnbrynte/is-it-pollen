const objectToList = (obj, keyId = "key") => {
    return Object.keys(obj).map(function(key) {
        if (typeof obj[key] === "object") {
            return {
                ...obj[key],
                [keyId]: key
            };
        } else {
            return {
                key,
                value: obj[key]
            };
        }
    });
};

const listToObject = (list, keyId) => {
    let obj = {};
    list.forEach((e, i) => {
        obj[e[keyId]] = e;
    });
};

const className = (o) => {
    if (!(o instanceof Array)) {
        o = [o];
    }
    return o.map((e) => {
        if (typeof e === "object") {
            return objectToList(e).filter((_e) => _e.value).map((_e) => _e.key).join(" ");
        }
        return e;
    }).join(" ");
};

export {
    objectToList,
    listToObject,
    className
};