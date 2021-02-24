import { useSelector } from 'react-redux';
import Link from 'next/link';
import {useRouter} from 'next/router';

import LinkToBack from '../LinkToBack';

import styles from '../../styles/Dashboard.module.css';

const Discounts = () => {

    const router = useRouter();
    const { discounts } = useSelector(state => state.discounts)
    
    return (
        <section className={styles.itemsWrapper}>
            <h2 className={styles.itemsTitle}>Скидки</h2>
            <LinkToBack/>
            {discounts.map(({id, content, dateOfReceiving }) => (
                <article className={styles.item} key={id}>
                    <h3> &#x1F4B2; {content}</h3>
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

export default Discounts;