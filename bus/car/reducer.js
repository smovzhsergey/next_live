import { types } from "./types";

const initialState = {
    cars: [],
    singleCar: {}
};

export const carsReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.FILL_CARS:
            return {...state, cars: payload};

        case types.FILL_SINGLE_CAR:
            return {...state, singleCar: payload};

        default:
            return state;
    };
};
