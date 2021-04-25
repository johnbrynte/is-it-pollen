import React, { useEffect, useState } from "react"
import Overview from "./overview/Overview";
import DailySelector from "./selector/DailySelector";
import Settings from "./Settings";
import Modal from "./UI/Modal/Modal";
import { ModalProvider } from "./UI/Modal/ModalContext";

const App = () => {
    const storageString = "indie.johnbrynte.harjagpollenallergi";

    const [datapoints, setDatapoints] = useState([]);

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

    const updateDatapoint = (i, data) => {
        let newDatapoints = [...datapoints];

        newDatapoints[i] = {
            ...datapoints[i],
            health: {
                ...datapoints[i].health,
                ...data.health
            },
            stats: {
                ...datapoints[i].stats,
                ...data.stats
            }
        };
        setDatapoints(newDatapoints);
    };

    const removeDatapoint = (i) => {
        let newDatapoints = [...datapoints];
        newDatapoints.splice(i, 1);
        setDatapoints(newDatapoints);
    };

    return (
        <>
            <ModalProvider>
                <DailySelector select={select} />
                <Overview datapoints={datapoints} updateDatapoint={updateDatapoint} removeDatapoint={removeDatapoint} />
                <Settings setDatapoints={setDatapoints} />
                <Modal />
            </ModalProvider>
        </>
    )
};

export default App;