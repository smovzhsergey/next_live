import { types } from "./types";

const initialState = {
    discounts: [],
    singleDiscount: {}
};

export const discountsReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.FILL_DISCOUNTS:
            return {...state, discounts: payload};

        case types.FILL_SINGLE_DISCOUNT:
            return {...state, singleDiscount: payload};

        default:
            return state;
    };
};


