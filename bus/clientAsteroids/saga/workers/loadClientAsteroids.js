import { put, call } from 'redux-saga/effects';

import { clientAsteroidsActions } from '../../actions';

import { verifyEnvironment } from '../../../../helpers/verifyEnvironment';
import { developmentLogger, productionLogger } from '../../../../helpers/logger';

const url = 'http://www.asterank.com/api/asterank?query=%7B%22e%22:%7B%22$lt%22:0.1%7D,%22i%22:%7B%22$lt%22:4%7D,%22a%22:%7B%22$lt%22:1.5%7D%7D&limit=10';

const logUrl = '/api/logs/rest';

export function* loadClientAsteroids () {

    const {
        isDevelopment,
        isProduction
    } = verifyEnvironment();
    
    let status = null;

    try {

        if (isDevelopment) {
            developmentLogger.info(`API GET request to ${url} was started...`);
        }
        
        const response = yield call(fetch, url);

        const results = yield call([response, response.json]);

        status = response.status;
        
        if (status !== 200) { 
            if (isDevelopment) {
                developmentLogger.warn({
                    message: `Current status code is: ${status}`
                });
            }
        
            if (isProduction) {
                productionLogger.warn({
                    method: 'GET',
                    message: `API Error`,
                    status,
                    url,
                });
            }
        }
        
        yield put(clientAsteroidsActions.fillClientAsteroids(results));

    } catch (error) {
        if (isDevelopment) {
            developmentLogger.warn({
                message: `Current status code is: ${status}`
            });
        }

        if (isProduction) {
            productionLogger.warn({
                method: 'GET',
                message: `API Error`,
                status,
                url,
            });
        }
    } finally {
        if (isDevelopment) {
            developmentLogger.info(`API GET request to ${url} was finished with status ${status}`);
        }
        if (isProduction) {
            fetch(logUrl, {
                method: 'POST',
                body: JSON.stringify({
                    status,
                    type: 'REST',
                }),
            })
        }
    }
}
