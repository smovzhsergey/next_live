import { types } from "./types";

export const initialActions = {
    loadAllScripts: () => {
        return {
            type: types.LOAD_ALL_SCRIPTS,
        }
    }
};
