import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.navItem}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                </div>
                <div className={styles.navItem}>
                    <Link to="/pokemons" className={styles.navLink}>All Pokemons</Link>
                </div>
                <div className={styles.navItem}>
                    <Link to="/favourite" className={styles.navLink}>Favourite Pokémon</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;