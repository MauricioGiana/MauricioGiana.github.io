import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import pokeBall from '../../images/pokeBall.png';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navcontainer}>
                <Link to={"/"}>
                    <div className={styles.header}>
                        <img className={styles.landicon} src={pokeBall} alt="Landing" />
                        <div className={styles.title}>
                            <span className={styles.maintitle}>Henry Pokemons</span>
                            <span className={styles.sectitle}>Individual Project</span>
                        </div>
                    </div>
                </Link>
                <div className={styles.items}>
                    <Link className={styles.item} to="/pokemons"><span>Home</span></Link>
                    <Link className={styles.item} to="/pokemons/favorites"><span>Favorites</span></Link>
                    <Link className={styles.item} to="/pokemons/mypokemons"><span>My Pokemons</span></Link>
                    <Link className={styles.item} to="/pokemons/create"><span>Create your Pokemon</span></Link>
                </div>
                <div className={styles.search}>
                    <SearchBar />
                </div>
            </div>
        </nav>
    )
}