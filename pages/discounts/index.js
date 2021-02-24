const fs = require('fs').promises;
import * as R from 'ramda';

import Discounts from '../../components/Discounts';
import { discountsActions } from '../../bus/discount/actions';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import discountsData from '../../discounts.json'
import { readDataFile } from '../../helpers';

export const getServerSideProps = async (ctx) => {

    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());

    // const { discounts } = await readDataFile('discounts.json');
    const { discounts } = discountsData;
    const actualData = discounts.map(({id, content}) => ({ id, content, dateOfReceiving: new Date().toString() }));

    store.dispatch(discountsActions.fillDiscounts(actualData));
    
    const currentPageReduxState = {
        discounts: {
            discounts: store.getState().discounts.discounts,
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

export default function DiscountsPage () {

    return <Discounts />
}
