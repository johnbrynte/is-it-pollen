import React, { useEffect, useReducer, useState } from "react"
import Modal from "./UI/Modal/Modal";
import { ModalProvider } from "./UI/Modal/ModalContext";

import Home from "./Home";
import { WindowProvider } from "./UI/Window/WindowContext";

import { getServerData, saveServerData } from "./server";
import { actionTypes, init, reducer } from "./reducers/reducer";
import { useActions } from "./actions/App";

const App = () => {
    const storageString = "indie.johnbrynte.harjagpollenallergi";

    const [data, dispatch] = useReducer(reducer, null, init);

    const { callbackHandler } = useActions(dispatch);

    const [hasFetched, setHasFetched] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        getServerData().then(function(serverData) {
            try {
                const saveData = serverData ? JSON.parse(serverData.data) : JSON.parse(window.localStorage.getItem(storageString));

                if (saveData) {
                    dispatch({
                        type: actionTypes.reset,
                        payload: saveData
                    });
                }
            } catch (e) { }

            setHasFetched(true);
        });
    }, [hasFetched]);

    useEffect(() => {
        if (hasFetched) {
            window.localStorage.setItem(storageString, JSON.stringify(data));

            if (hasInitialized) {
                saveServerData(data);
            } else {
                setHasInitialized(true);
            }
        }
    }, [data]);

    // get all datapoints sorted by date
    const datapointsByDate = data.dates.allIds.sort().map((dateId) => (
        data.dates.byId[dateId].map((dataId) => (
            data.datapoints.byId[dataId]
        ))
    ));

    // unpack to one list
    const datapoints = datapointsByDate.length > 1 ? datapointsByDate.reduce((prev, cur) => prev.concat(cur)) : datapointsByDate[0];

    return (
        <>
            <WindowProvider>
                <ModalProvider>
                    <Home datapoints={datapoints} currentData={data} callbackHandler={callbackHandler}></Home>

                    <Modal />
                </ModalProvider>
            </WindowProvider>
        </>
    )
};

export default App;