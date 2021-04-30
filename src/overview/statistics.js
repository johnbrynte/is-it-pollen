import { objectToList } from "../helpers";

export const dataNames = {
    al: "Al",
    ek: "Ek",
    en: "En",
    alm: "Alm",
    gran: "Gran",
    gras: "Gräs",
    tall: "Tall",
    bjork: "Björk",
    grabo: "Gråbo",
    hassel: "Hassel",
    salgvide: "Sälg/Vide",
    alternaria: "Alternaria",
    cladosporium: "Cladosporium",
    malortsambrosia: "Malörtsambrosia",
};

const calculateData = (d) => {
    if (!d) {
        return null;
    }

    let _d = {};

    const value = Object.values(d.health).reduce((prev, cur) => prev + cur);

    d.stats.pollen.forEach((e) => {
        if (value === 0) {
            // remove "probability" of pollen
            _d[e.id] = - e.value / e.valueMax;
        } else {
            // add "probability" of pollen
            _d[e.id] = value * e.value / e.valueMax;
        }
    });

    return _d;
};

export const getStats = (datapoints) => {
    if (!datapoints || !datapoints.length) {
        return null;
    }

    const calculatedDatapoints = datapoints.map(calculateData);

    const stats = calculatedDatapoints.reduce((prev, data) => {
        for (var key in data) {
            if (isNaN(prev[key])) {
                prev[key] = 0;
            }
            prev[key] += data[key];
        }
        return prev;
    });

    let statsNormalized = { ...stats };
    for (var key in statsNormalized) {
        if (statsNormalized[key] < 0) {
            statsNormalized[key] = 0;
        }
    }

    return statsNormalized;
}

export const getAverage = (stats) => {
    if (!stats) {
        return null;
    }

    const statsList = objectToList(stats);

    const sum = statsList.reduce((prev, next) => (isNaN(prev) ? prev.value : prev) + next.value);

    return sum / statsList.length;
}

export const getSensitiveStats = (stats) => {
    if (!stats) {
        return null;
    }

    // const maxValue = objectToList(stats).reduce((prev, next) => Math.max(isNaN(prev) ? prev.value : prev, next.value));

    const average = getAverage(stats);

    return objectToList(stats)
        // .filter((e) => e.value / maxValue > 0.5)
        .filter((e) => e.value > average)
        .map((e) => e.key);
}