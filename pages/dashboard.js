const fs = require('fs').promises;

import nookies from 'nookies';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import Link from 'next/link';
import newsData from '../news.json'
import carsData from '../cars.json'
import discountsData from '../discounts.json'

import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { userActions } from "../bus/user/actions";
import { newsActions } from '../bus/news/actions';
import { discountsActions } from '../bus/discount/actions';
import { carsActions } from '../bus/car/actions';

import { findUserByCookie, readDataFile, detectUserType, serverDispatch } from '../helpers';
import styles from '../styles/Dashboard.module.css';

export const getServerSideProps = async (ctx) => {

    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());
    
    const { visitors } = await readDataFile('users.json'); 
    // const { news } = await readDataFile('news.json');
    // const { discounts } = await readDataFile('discounts.json');
    // const { cars } = await readDataFile('cars.json');

    const {news} = newsData;
    const { discounts } = discountsData;
    const { cars } = carsData;
    
    const { user_cookie } = nookies.get(ctx);
    
    // const user = await findUserByCookie(user_cookie, visitors, ctx, fs);
    const user = { userId: '1613578841179', visitCounts: 116 }
    

    const userType = detectUserType(user.visitCounts);

    if (user.userId) {
        await serverDispatch(store, (dispatch) => {
            dispatch(userActions.fillUser(user.userId));
            dispatch(userActions.setVisitCounts(user.visitCounts));
            dispatch(userActions.setUserType(userType));
            dispatch(newsActions.fillNews(news));
            dispatch(carsActions.fillCars(cars));
            dispatch(discountsActions.fillDiscounts(discounts));
        });
    }

    const currentPageReduxState = {
        cars: {
            cars: store.getState().cars.cars
        },
        news: {
            news: store.getState().news.news
        },
        discounts: {
            discounts: store.getState().discounts.discounts
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

export default function Dashboard () {

    const { cars: { cars }, discounts: { discounts }, news: { news } } = useSelector(state => state);

    const pageData = Object.entries({
        news, 
        discounts,
        cars,
    });
    
    const linksList = pageData.map(([unitName, unitItems], index) => (
        <section key={index}>
            <Link href={`/${unitName}`}><a>{unitName.toUpperCase()}</a></Link>
            <ul>
                { 
                    unitItems.map(({id, content}) => (
                        <li key = {id}>
                            <Link href={`/${unitName}/${id}`}><a>{content}</a></Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    ));

    return (
        <div className={styles.container}>
            {linksList}
        </div>
    )
}
