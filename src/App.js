import React, { useEffect, useState } from "react"
import Overview from "./overview/Overview";
import Selector from "./selector/Selector";

const App = () => {
    // temporary test data
    const statsTmp = {
        date: (new Date()).toISOString(),
        pollen: [{
            "name": "Björk",
            "value": 3,
            "valueMax": 7
        },
        {
            "name": "Sälg/Vide",
            "value": 2,
            "valueMax": 7
        },
        {
            "name": "Alm",
            "value": 2,
            "valueMax": 7
        },
        {
            "name": "Al",
            "value": 2,
            "valueMax": 7
        },
        {
            "name": "Hassel",
            "value": 1,
            "valueMax": 7
        }]
    };

    const [datapoints, setDatapoints] = useState([]);

    const storageString = "indie.johnbrynte.harjagpollenallergi";

    useEffect(() => {
        try {
            var data = JSON.parse(window.localStorage.getItem(storageString));

            if (data) {
                setDatapoints(data);
            }
        } catch (e) { }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageString, JSON.stringify(datapoints));
    }, [datapoints]);

    const select = async (health) => {
        const response = await fetch("https://www.johnbrynte.se/api/pollen/stockholm/");

        if (!response.ok) {
            console.error(response);
            return;
        }

        const data = await response.json();

        if (!data.success) {
            console.error(data.error);
            return;
        }

        const stats = data.data;

        setDatapoints([...datapoints, {
            health: { ...health },
            stats
        }]);
    };

    return (
        <>
            <Selector select={select} />
            <Overview datapoints={datapoints} />
        </>
    )
};

export default App;