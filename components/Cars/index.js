import { useSelector } from 'react-redux';
import Link from 'next/link';
import {useRouter} from 'next/router';

import LinkToBack from '../LinkToBack';

import styles from '../../styles/Dashboard.module.css';

const Cars = () => {

    const router = useRouter();
    const { cars } = useSelector(state => state.cars)
    
    return (
        <section className={styles.itemsWrapper}>
            <h2 className={styles.itemsTitle}>Машины</h2>
            <LinkToBack />
            {cars.map(({id, content, dateOfReceiving }) => (
                <article className={styles.item} key={id}>
                    <h3> &#128663; {content}</h3>
                    <div className={styles.properties}>
                        <p>id: <span className={styles.itemProperty}>{id};</span></p>
                        <p>добавлено в: <span className={styles.itemProperty}>{dateOfReceiving}</span></p>
                    </div>
                    <Link href={`${router.asPath}/${id}`}>
                        <a>Детальнее ...</a>
                    </Link>
                </article>
            ))}
        </section>
    )
}

export default Cars;