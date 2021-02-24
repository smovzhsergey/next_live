import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from './styles.module.css';

const Menu = () => {

    const router = useRouter();

    const menuItems = [
        {path: '/', title: 'Main'},
        {path: '/dashboard', title: 'Dashboard'},
        {path: '/user', title: 'User'}
    ];

    const menuList = menuItems.map((item, index) => (
        <Link key = {index} href={item.path}>
            <a className = {item.path === router.asPath ? styles.active : styles.link }>{item.title}</a>
        </Link>
    ));
    
    return (
        <nav className={styles.nav}>
            { menuList }
        </nav>
    )
}

export default Menu;