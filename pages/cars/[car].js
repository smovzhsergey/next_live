const fs = require('fs').promises;
import nookies from 'nookies';
import * as R from 'ramda';

import SingleCar from '../../components/SingleCar';
import { carsActions } from '../../bus/car/actions';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

import { readDataFile, findUserByCookie, detectUserType } from '../../helpers';

export const getServerSideProps = async (ctx) => {
    
    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());
    
    const { cars } = await readDataFile('./data/cars.json');
    const { visitors } = await readDataFile('./data/users.json');    
    const { user_cookie } = nookies.get(ctx);

    const user = await findUserByCookie(user_cookie, visitors, ctx, fs);
    
    const userType = detectUserType(user.visitCounts);
    
    if (userType !== 'familyMember') {
        
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const actualData = cars.filter(car => car.id === ctx.query.car);
    
    if (actualData.length === 0) {
        return {
            notFound: true
        }
    }

    const car = actualData[0];

    car.dateOfReceiving = new Date().toString();
    
    store.dispatch(carsActions.fillSingleCar(car));

    const currentPageReduxState = {
        cars: {
            singleCar: store.getState().cars.singleCar,
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

export default function SingleDiscountPage () {

    return (
        <div>
            <SingleCar/>
        </div>
    )
}
