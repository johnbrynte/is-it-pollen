import React, { useEffect, useState } from "react"
import Modal from "./UI/Modal/Modal";
import { ModalProvider } from "./UI/Modal/ModalContext";

import Home from "./Home";
import { WindowProvider } from "./UI/Window/WindowContext";

const App = () => {
    const storageString = "indie.johnbrynte.harjagpollenallergi";

    const [datapoints, setDatapoints] = useState([]);

    useEffect(() => {
        try {
            const data = JSON.parse(window.localStorage.getItem(storageString));

            if (data) {
                setDatapoints(data);
            }
        } catch (e) { }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageString, JSON.stringify(datapoints));
    }, [datapoints]);

    const addDatapoint = async (health) => {
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

        newDatapoints.sort((a, b) => a.stats.date > b.stats.date ? 1 : -1);

        setDatapoints(newDatapoints);
    };

    const removeDatapoint = (i) => {
        let newDatapoints = [...datapoints];
        newDatapoints.splice(i, 1);
        setDatapoints(newDatapoints);
    };

    const removeAllDatapoints = () => {
        setDatapoints([]);
    };

    return (
        <>
            <WindowProvider>
                <ModalProvider>
                    <Home datapoints={datapoints} addDatapoint={addDatapoint} updateDatapoint={updateDatapoint} removeDatapoint={removeDatapoint} removeAllDatapoints={removeAllDatapoints}></Home>

                    <Modal />
                </ModalProvider>
            </WindowProvider>
        </>
    )
};

export default App;