const fs = require('fs').promises;
import * as R from 'ramda';

import Cars from '../../components/Cars';
import { carsActions } from '../../bus/car/actions';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

import { readDataFile } from '../../helpers';

export const getServerSideProps = async (ctx) => {

    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());

    const { cars } = await readDataFile('cars.json');

    const actualData = cars.map(({id, content}) => ({ id, content, dateOfReceiving: new Date().toString() }));

    store.dispatch(carsActions.fillCars(actualData));
    
    const currentPageReduxState = {
        cars: {
            cars: store.getState().cars.cars,
        },
    };
    
    const initialReduxState = R.mergeDeepRight(
        stateUpdates,
        currentPageReduxState
    );

    return {
        props: {
            initialReduxState
        }
    }
}

export default function CarsPage () {

    return <Cars />
}
