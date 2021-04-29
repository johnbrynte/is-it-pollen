import React, { useReducer } from "react"
import Modal from "./UI/Modal/Modal";
import { ModalProvider } from "./UI/Modal/ModalContext";

import Home from "./Home";
import { WindowProvider } from "./UI/Window/WindowContext";

import { actionTypes, reducer } from "./Datapoints";

const App = () => {
    // const storageString = "indie.johnbrynte.harjagpollenallergi";

    const [data, dispatch] = useReducer(reducer, {
        datapoints: {
            byId: {},
            allIds: []
        },
        dates: {
            byId: {},
            allIds: []
        }
    });

    // useEffect(() => {
    //     try {
    //         const data = JSON.parse(window.localStorage.getItem(storageString));

    //         if (data) {
    //             setDatapoints(data);
    //         }
    //     } catch (e) { }
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem(storageString, JSON.stringify(data));
    // }, [data]);

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
        const id = Date.now();
        const date = stats.date.split(" ")[0];

        dispatch({
            type: actionTypes.add,
            payload: {
                id,
                date,
                health,
                stats
            }
        });
    };

    const updateDatapoint = (id, data) => {
        dispatch({
            type: actionTypes.update,
            payload: {
                id,
                data
            }
        });
    };

    const removeDatapoint = (id) => {
        dispatch({
            type: actionTypes.remove,
            payload: {
                id: id
            }
        });
    };

    const removeAllDatapoints = () => {
        dispatch({
            type: actionTypes.reset
        });
    };

    // get all datapoints sorted by date
    const datapointsByDate = data.dates.allIds.sort().map((dateId) => (
        data.dates.byId[dateId].map((dataId) => (
            data.datapoints.byId[dataId]
        ))
    ));

    const datapoints = datapointsByDate.length > 1 ? datapointsByDate.reduce((prev, cur) => prev.concat(cur)) : datapointsByDate[0];

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