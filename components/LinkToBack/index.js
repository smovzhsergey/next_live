import Link from 'next/link';
import styles from '../../styles/Dashboard.module.css';

const LinkToBack = () => (
    <Link href={'/dashboard'}>
        <a className={styles.details}>Назад</a>
    </Link>
);


export default LinkToBack;