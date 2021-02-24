
import { useSelector } from 'react-redux';
import Link from 'next/link';
import {useRouter} from 'next/router';

import LinkToBack from '../LinkToBack';

import styles from '../../styles/Dashboard.module.css';

const News = () => {

    const router = useRouter();
    const { news } = useSelector(state => state.news)
    
    return (
        <section className={styles.itemsWrapper}>
            <h2 className={styles.itemsTitle}>Новости</h2>
            <LinkToBack/>
            {news.map(({id, content, dateOfReceiving }) => (
                <article className={styles.item} key={id}>
                    <h3> &#x26A1; {content}</h3>
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

export default News;