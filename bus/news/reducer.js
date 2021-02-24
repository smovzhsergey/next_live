import { types } from "./types";

const initialState = {
    news: [],
    article: {},
};

export const newsReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.FILL_NEWS:
            return {...state, news: payload};

        case types.FILL_ARTICLE:
            return {...state, article: payload};

        default:
            return state;
    };
};
