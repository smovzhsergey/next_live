import { types } from "./types";

const initialState = {
    entries: null,
};

export const clientAsteroidsReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.FILL_CLIENT_ASTEROIDS:
            return {...state, entries: payload};

        default:
            return state;
    };
};
