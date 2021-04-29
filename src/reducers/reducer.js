export const actionTypes = {
    add: "ADD",
    remove: "REMOVE",
    update: "UPDATE",
    reset: "RESET"
};

export const init = (data) => {
    return data || {
        datapoints: {
            byId: {},
            allIds: []
        },
        dates: {
            byId: {},
            allIds: []
        }
    };
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.add: {
            return {
                ...state,
                datapoints: {
                    ...state.datapoints,
                    byId: {
                        ...state.datapoints.byId,
                        [action.payload.id]: action.payload,
                    },
                    allIds: state.datapoints.allIds.concat(action.payload.id)
                },
                dates: {
                    ...state.dates,
                    byId: {
                        ...state.dates.byId,
                        [action.payload.date]: [
                            ... (state.dates.byId[action.payload.date] || []),
                            action.payload.id
                        ]
                    },
                    allIds: [...new Set([...state.dates.allIds, action.payload.date])]
                }
            };
        }
        case actionTypes.remove: {
            const datapoint = state.datapoints.byId[action.payload.id];

            const { [datapoint.id]: remove, ...datapointsById } = state.datapoints.byId;

            return {
                ...state,
                datapoints: {
                    ...state.datapoints,
                    byId: datapointsById,
                    allIds: state.datapoints.allIds.filter(id => id !== datapoint.id)
                },
                dates: {
                    ...state.dates,
                    byId: {
                        ...state.dates.byId,
                        [datapoint.date]: state.dates.byId[datapoint.date].filter(id => id !== datapoint.id)
                    },
                }
            };
        }
        case actionTypes.update: {
            const datapoint = state.datapoints.byId[action.payload.id];

            // warning, non-deep copy!
            const newDatapoint = {
                ...datapoint,
                ...action.payload.data
            };

            const newState = datapoint.date === newDatapoint.date ? state :
                {
                    ...state,
                    dates: {
                        ...state.dates,
                        byId: {
                            ...state.dates.byId,
                            [datapoint.date]: state.dates.byId[datapoint.date].filter(id => id !== datapoint.id)
                        }
                    }
                };

            return {
                ...newState,
                datapoints: {
                    ...newState.datapoints,
                    byId: {
                        ...newState.datapoints.byId,
                        [datapoint.id]: newDatapoint
                    }
                },
                dates: {
                    ...newState.dates,
                    byId: {
                        ...newState.dates.byId,
                        [newDatapoint.date]: [...new Set([
                            ... (newState.dates.byId[newDatapoint.date] || []),
                            newDatapoint.id
                        ])]
                    },
                    allIds: [...new Set([...newState.dates.allIds, newDatapoint.date])]
                }
            };
        }
        case actionTypes.reset: {
            return init(action.payload);
        }
        default: {
            throw new Error("Unhandled type: " + action.type);
        }
    }
};