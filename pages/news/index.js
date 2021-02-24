const fs = require('fs').promises;
import * as R from 'ramda';

import News from '../../components/News';
import { newsActions } from '../../bus/news/actions';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

import { readDataFile } from '../../helpers';

export const getServerSideProps = async (ctx) => {

    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());

    const { news } = await readDataFile('news.json');

    const actualNews = news.map(({id, content}) => ({ id, content, dateOfReceiving: new Date().toString() }));

    store.dispatch(newsActions.fillNews(actualNews));
    
    const currentPageReduxState = {
        news: {
            news: store.getState().news.news,
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

export default function NewsPage () {

    return <News />
}
