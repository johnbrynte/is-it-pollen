import React, { useEffect, useReducer } from "react"
import Modal from "./UI/Modal/Modal";
import { ModalProvider } from "./UI/Modal/ModalContext";

import Home from "./Home";
import { WindowProvider } from "./UI/Window/WindowContext";

import { actionTypes, init, reducer } from "./reducers/reducer";
import { useActions } from "./actions/App";

const App = () => {
    const storageString = "indie.johnbrynte.harjagpollenallergi";

    const [data, dispatch] = useReducer(reducer, null, init);

    const { callbackHandler } = useActions(dispatch);

    useEffect(() => {
        try {
            const data = JSON.parse(window.localStorage.getItem(storageString));

            if (data) {
                dispatch({
                    type: actionTypes.reset,
                    payload: data
                });
            }
        } catch (e) { }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageString, JSON.stringify(data));
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
                    <Home datapoints={datapoints} callbackHandler={callbackHandler}></Home>

                    <Modal />
                </ModalProvider>
            </WindowProvider>
        </>
    )
};

export default App;