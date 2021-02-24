import { useSelector } from 'react-redux';

import { selectAsteroidsEntries } from './selectors';



const Asteroids = () => {

    const entries = useSelector(selectAsteroidsEntries)

    const asteroidsList = entries && entries.map(({full_name, id}) => (
        <p key = { id }>{ full_name }</p>
    ));

    return (
        <section>
            <h2>Asteroids</h2>
            {asteroidsList}
        </section>
    )
}

export default Asteroids;