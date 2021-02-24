import { types } from "./types";

export const newsActions = {
    fillNews: (news) => {
        return {
            type: types.FILL_NEWS,
            payload: news,
        }
    },
    fillArticle: (article) => {
        return {
            type: types.FILL_ARTICLE,
            payload: article,
        }
    }
};
