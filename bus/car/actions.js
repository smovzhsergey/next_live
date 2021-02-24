import { types } from "./types";

export const carsActions = {
    fillCars: (cars) => {
        return {
            type: types.FILL_CARS,
            payload: cars,
        }
    },
    fillSingleCar: (car) => {
        return {
            type: types.FILL_SINGLE_CAR,
            payload: car,
        }
    }
};
