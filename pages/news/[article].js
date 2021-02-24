const fs = require('fs').promises;
import * as R from 'ramda';

import Article from '../../components/Article';
import { newsActions } from '../../bus/news/actions';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

import { readDataFile } from '../../helpers';

export const getServerSideProps = async (ctx) => {
    
    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());
    
    const { news } = await readDataFile('./data/news.json');

    const articleData = news.filter(article => article.id === ctx.query.article);

    if (articleData.length === 0) {
        return {
            notFound: true
        }
    }

    const article = articleData[0];

    article.dateOfReceiving = new Date().toString();
    
    store.dispatch(newsActions.fillArticle(article));

    const currentPageReduxState = {
        news: {
            article: store.getState().news.article,
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

export default function ArticlePage () {

    return (
        <div>
            <Article/>
        </div>
    )
}
