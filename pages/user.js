const fs = require('fs').promises;
import nookies from 'nookies';
import * as R from 'ramda';

import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';

import {userActions} from "../bus/user/actions";

import User from '../components/User';

import styles from '../styles/Home.module.css';
import { findUserByCookie, detectUserType, readDataFile, serverDispatch } from '../helpers';

export const getServerSideProps = async (ctx) => {

    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore()); 

    const { visitors } = await readDataFile('./data/users.json');    
    const { user_cookie } = nookies.get(ctx);

    const user = await findUserByCookie(user_cookie, visitors, ctx, fs);

    const userType = detectUserType(user.visitCounts);

    if (user.userId) {
        await serverDispatch(store, (dispatch) => {
            dispatch(userActions.fillUser(user.userId));
            dispatch(userActions.setVisitCounts(user.visitCounts));
            dispatch(userActions.setUserType(userType));
        });
    }
    
    const currentPageReduxState = {
        user: {
            userId: store.getState().user.userId,
            userType: store.getState().user.userType,
            visitCounts: store.getState().user.visitCounts
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

export default function UserPage() {

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <User/>
            </main>
        </div>
    )
}
