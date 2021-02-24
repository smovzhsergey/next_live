import { useSelector } from 'react-redux';
import LinkToBack from '../LinkToBack';

import styles from '../../styles/Dashboard.module.css';

const SingleCar = () => {
    
    const { singleCar: {id, content, dateOfReceiving} } = useSelector(state => state.cars);

    return (
        <article className={styles.item}>
            <LinkToBack/>
            <h3> &#x26A1; {content}</h3>
            <div className={styles.properties}>
                <p>id: <span className={styles.itemProperty}>{id};</span></p>
                <p>добавлено в: <span className={styles.itemProperty}>{dateOfReceiving}</span></p>                        
            </div>
        </article>
    )
}

export default SingleCar;