const fs = require('fs').promises;
import nookies from 'nookies';
import * as R from 'ramda';

import SingleDiscount from '../../components/SingleDiscount';
import { discountsActions } from '../../bus/discount/actions';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

import { readDataFile, findUserByCookie, detectUserType } from '../../helpers';

export const getServerSideProps = async (ctx) => {
    
    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());
    
    const { discounts } = await readDataFile('discounts.json');
    const { visitors } = await readDataFile('users.json');    
    const { user_cookie } = nookies.get(ctx);

    const user = await findUserByCookie(user_cookie, visitors, ctx, fs);
    
    const userType = detectUserType(user.visitCounts);

    if (userType === 'guest') {
        
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const actualData = discounts.filter(discount => discount.id === ctx.query.discount);
    
    if (actualData.length === 0) {
        return {
            notFound: true
        }
    }

    const discount = actualData[0];

    discount.dateOfReceiving = new Date().toString();
    
    store.dispatch(discountsActions.fillSingleDiscount(discount));

    const currentPageReduxState = {
        discounts: {
            singleDiscount: store.getState().discounts.singleDiscount,
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
            <SingleDiscount/>
        </div>
    )
}
