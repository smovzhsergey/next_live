const fs = require('fs').promises;
import nookies from 'nookies';
import { useSelector } from "react-redux";
import * as R from 'ramda';

import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { initApollo } from '../init/initApollo';

import {userActions} from "../bus/user/actions";
import {asteroidsActions} from "../bus/asteroids/actions";
import {selectAsteroidsEntries} from "../bus/asteroids/selectors";

import Message from '../components/Message';
import Asteroids from '../bus/asteroids/Asteroids';
import ClientAsteroids from '../bus/clientAsteroids/ClientAsteroids';
import Pokemons from '../bus/pokemons/Pokemons';

import styles from '../styles/Home.module.css';
import { findUserByCookie, createGreetingMessage, detectUserType, readDataFile, serverDispatch, disableSaga } from '../helpers';
import queryPokemons from '../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql'

export const getServerSideProps = async (ctx) => {

    const { store, stateUpdates } = await initialDispatcher(ctx, initializeStore());

    const initialApolloState = await initApollo(ctx, async (execute) => {
        await execute({
            query: queryPokemons,
        });
    });
    
    const { visitors } = await readDataFile('users.json');    
    const { user_cookie } = nookies.get(ctx);

    // const user = await findUserByCookie(user_cookie, visitors, ctx, fs);
    const user = { userId: '1613578841179', visitCounts: 116 }

    const userType = detectUserType(user.visitCounts);

    if (user.userId) {
        await serverDispatch(store, (dispatch) => {
            dispatch(userActions.fillUser(user.userId));
            dispatch(userActions.setVisitCounts(user.visitCounts));
            dispatch(userActions.setUserType(userType));
            dispatch(asteroidsActions.loadAsteroidsAsync())
        });
    }
    
    await disableSaga(store);

    const currentPageReduxState = {
        user: {
            userId: store.getState().user.userId,
            userType: store.getState().user.userType,
            visitCounts: store.getState().user.visitCounts
        },
        asteroids: {
            entries: selectAsteroidsEntries(store.getState())
        }
    };
    
    const initialReduxState = R.mergeDeepRight(
        stateUpdates,
        currentPageReduxState
    );

    return {
        props: {
            initialApolloState,
            initialReduxState,
        }
    }
}

export default function Home() {
    
    const visitCounts = useSelector(state => state.user.visitCounts)

    const message = createGreetingMessage(visitCounts);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>
                    {message}
                </h1>
                <Message/>
                <ClientAsteroids />
                <Asteroids />
                <Pokemons />
            </main>
        </div>
    )
}
