import { all } from 'redux-saga/effects';

import { watchAsteroids } from '../bus/asteroids/saga/watchers';
import { watchClientAsteroids } from '../bus/clientAsteroids/saga/watchers';

export function* rootSaga() {
    yield all([ 
        watchAsteroids(),
        watchClientAsteroids()
    ]);
};

