import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectClientAsteroidsEntries } from './selectors';
import { clientAsteroidsActions } from './actions';
import styles from './styles.module.scss';

const ClientAsteroids = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clientAsteroidsActions.loadClientAsteroidsAsync());
    }, []);

    const entries = useSelector(selectClientAsteroidsEntries)

    const asteroidsList = entries && entries.map(({full_name, id}) => (
        <p key = { id }>{ full_name }</p>
    ));

    return (
        <section className={styles.asteroids}>
            <h2 className={styles.title}>Client-Side-Asteroids</h2>
            {asteroidsList}
        </section>
    )
}

export default ClientAsteroids;