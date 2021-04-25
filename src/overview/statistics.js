import { objectToList } from "../helpers";

const calculateData = (d) => {
    if (!d) {
        return null;
    }

    let _d = {};

    const value = Object.values(d.health).reduce((prev, cur) => prev + cur);

    d.stats.pollen.forEach((e) => {
        _d[e.id] = value * e.value / e.valueMax;
    });

    return _d;
};

export const dataNames = {
    bjork: "Björk",
    salgvide: "Sälg/Vide",
    alm: "Alm",
    al: "Al",
    hassel: "Hassel",
};

export const getStats = (datapoints) => {
    if (!datapoints || !datapoints.length) {
        return null;
    }

    const calculatedDatapoints = datapoints.map(calculateData);

    return calculatedDatapoints.reduce((prev, data) => {
        for (var key in data) {
            if (isNaN(prev[key])) {
                prev[key] = 0;
            }
            prev[key] += data[key];
        }
        return prev;
    });
}

export const getSensitiveStats = (stats) => {
    if (!stats || !stats.length) {
        return null;
    }

    const maxValue = objectToList(stats).reduce((prev, next) => Math.max(isNaN(prev) ? prev.value : prev, next.value));

    return objectToList(stats)
        .filter((e) => e.value / maxValue > 0.5)
        .map((e) => e.key);
}