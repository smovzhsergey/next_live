import { types } from "./types";

const initialState = {
    isLoaded: false
};

export const initialReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.LOAD_ALL_SCRIPTS:
            return {...state, isLoaded: true};

        default:
            return state;
    };
};
