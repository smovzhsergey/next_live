import { takeEvery, all, call } from 'redux-saga/effects';

import { types } from '../types';

import { loadClientAsteroids } from './workers/loadClientAsteroids';

function* watchLoadClientAsteroids () {
    yield takeEvery(types.LOAD_CLIENT_ASTEROIDS_ASYNC, loadClientAsteroids);
}

export function* watchClientAsteroids () {
    yield all([call(watchLoadClientAsteroids)]);
}
