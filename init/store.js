// Core
import { useMemo } from 'react';
import * as R from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    createStore,
    applyMiddleware,
} from 'redux';

import { verifyBrowser } from "../helpers/verifyBrowser";
import { verifyEnvironment } from "../helpers/verifyEnvironment";
import { serverReduxLogger } from "../helpers/logger";


// Middleware
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

let store;

const bindMiddleware = (middleware) => {
    
    const { isDevelopment } = verifyEnvironment();
    const isBrowser = verifyBrowser();
    
    if(isDevelopment) {
        if (isBrowser) {
            middleware.push(
                createLogger({
                    duration: true,
                    timestamp: true,
                    collapsed: true,
                    diff: true,
                })
            )
        } else {
            middleware.push(
                serverReduxLogger
            )
        }
    }

    return composeWithDevTools(applyMiddleware(...middleware));
}

export const initStore = (preloadedState) => {
    const defaultState = preloadedState ? createStore(rootReducer).getState() : {};
    const currentState = R.mergeDeepRight(
        defaultState,
        preloadedState,
    );

    const sagaMiddleware = createSagaMiddleware();
    const initedStore = createStore(
        rootReducer,
        currentState,
        bindMiddleware([ sagaMiddleware ]),
    );

    initedStore.sagaTask = sagaMiddleware.run(rootSaga);

    return initedStore;
};

export const initializeStore = (preloadedState = {}) => {
    let initializedStore = store || initStore(preloadedState);

    if (preloadedState && store) {
        initializedStore = initStore(R.mergeDeepRight(
        store.getState(),
        preloadedState
        ));

        store = undefined;
    }

    if (typeof window === 'undefined') {
        return initializedStore;
    }

    if (!store) {
        store = initializedStore;
    }

    return initializedStore;
};

export const useStore = (initialState = {}) => {
    return useMemo(
        () => initializeStore(initialState), [ initialState ])
};
