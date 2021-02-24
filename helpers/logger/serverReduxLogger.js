import { developmentLogger } from "./developmentLogger";

export const serverReduxLogger = store => next => action => {
    developmentLogger.info(`Redux Dispatch: ${action.type}`);

    next(action);
};
