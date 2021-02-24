import { types } from "./types";

const initialState = {
    userId: '',
    userType: '',
    visitCounts: 0,
};

export const userReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.FILL_USER:
            return {...state, userId: payload};
            
        case types.SET_USER_TYPE:
            return {...state, userType: payload};

        case types.SET_VISIT_COUNTS:
            return {...state, visitCounts: payload};

        default:
            return state;
    };
};
