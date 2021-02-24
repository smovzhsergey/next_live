import { types } from "./types";

export const clientAsteroidsActions = {
    fillClientAsteroids: (asteroids) => {
        return {
            type: types.FILL_CLIENT_ASTEROIDS,
            payload: asteroids,
        }
    },
    loadClientAsteroidsAsync: () => {
        return {
            type: types.LOAD_CLIENT_ASTEROIDS_ASYNC,
        }
    },
};
