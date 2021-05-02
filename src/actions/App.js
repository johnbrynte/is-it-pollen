import { CALLBACK_ENUMS } from "../Home";
import { actionTypes } from "../reducers/reducer";

const createDatapoint = async (health) => {
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

    return {
        id,
        date,
        health,
        stats
    };
};

export const useActions = (dispatch) => {
    const callbackHandler = (type, data) => {
        switch (type) {
            case CALLBACK_ENUMS.HOME_ADD_DATAPOINT:
                const { health } = data;

                createDatapoint(health).then((datapoint) => {
                    dispatch({
                        type: actionTypes.add,
                        payload: datapoint
                    });
                });
                break;
            case CALLBACK_ENUMS.DATAPOINT_REMOVE_DATAPOINT:
                dispatch({
                    type: actionTypes.remove,
                    payload: data
                });
                break;
            case CALLBACK_ENUMS.DATAPOINT_UPDATE_DATAPOINT:
                dispatch({
                    type: actionTypes.update,
                    payload: data
                });
                break;
            case CALLBACK_ENUMS.SETTINGS_SERVER_REMOVE_ALL_DATAPOINTS:
                dispatch({
                    type: actionTypes.reset,
                });
                break;
            case CALLBACK_ENUMS.SETTINGS_SERVER_NONE_SET_DATAPOINTS:
            case CALLBACK_ENUMS.SETTINGS_SERVER_CREATED_SET_DATAPOINTS:
                dispatch({
                    type: actionTypes.reset,
                    payload: data
                });
                break;
            default:
                throw new Error("Unknown type: " + type);
        }
    }

    return { callbackHandler };
}