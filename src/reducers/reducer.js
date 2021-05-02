export const actionTypes = {
    add: "ADD",
    remove: "REMOVE",
    update: "UPDATE",
    reset: "RESET"
};

export const init = (data) => {
    if (data) {
        // validate
        if (
            !data.datapoints || !(data.datapoints.byId instanceof Object) || !(data.datapoints.allIds instanceof Array)
            || !data.dates || !(data.dates.byId instanceof Object) || !(data.dates.allIds instanceof Array)
        ) {
            console.log("invalid", data)
            data = null;
        }
    }
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
            const added = action.payload;

            const addToDatapointsById = {
                ...state.datapoints.byId,
                [added.id]: added,
            };

            const addToDatapointsAllIds = state.datapoints.allIds.concat(added.id);

            const addToDatesById = {
                ...state.dates.byId,
                [added.date]: [
                    ... (state.dates.byId[added.date] || []),
                    added.id
                ]
            };

            const addToDatesAllIds = [...new Set([
                ...state.dates.allIds, added.date
            ])];

            return {
                ...state,
                datapoints: {
                    ...state.datapoints,
                    byId: addToDatapointsById,
                    allIds: addToDatapointsAllIds
                },
                dates: {
                    ...state.dates,
                    byId: addToDatesById,
                    allIds: addToDatesAllIds
                }
            };
        }
        case actionTypes.remove: {
            const removed = state.datapoints.byId[action.payload.id];

            const { [removed.id]: r, ...removeFromDatapointsById } = state.datapoints.byId;

            const removeFromDatapointsAllIds = state.datapoints.allIds.filter(id => id !== removed.id);

            const removeFromDatesById = {
                ...state.dates.byId,
                [removed.date]: state.dates.byId[removed.date].filter(id => id !== removed.id)
            };

            return {
                ...state,
                datapoints: {
                    ...state.datapoints,
                    byId: removeFromDatapointsById,
                    allIds: removeFromDatapointsAllIds
                },
                dates: {
                    ...state.dates,
                    byId: removeFromDatesById,
                }
            };
        }
        case actionTypes.update: {
            const current = state.datapoints.byId[action.payload.id];

            // warning, non-deep copy!
            const updated = {
                ...current,
                ...action.payload.data
            };

            const addToDatapointsById = {
                ...state.datapoints.byId,
                [current.id]: updated
            };

            const removeFromDatesById = current.date === updated.date ? state.dates.byId :
                {
                    ...state.dates.byId,
                    [current.date]: state.dates.byId[current.date].filter(id => id !== current.id)
                };

            const addToDatesById = {
                ...removeFromDatesById,
                [updated.date]: [...new Set([
                    ... (state.dates.byId[updated.date] || []),
                    updated.id
                ])]
            };

            const addToDatesAllIds = [...new Set([
                ...state.dates.allIds, updated.date
            ])];

            return {
                ...state,
                datapoints: {
                    ...state.datapoints,
                    byId: addToDatapointsById
                },
                dates: {
                    ...state.dates,
                    byId: addToDatesById,
                    allIds: addToDatesAllIds
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