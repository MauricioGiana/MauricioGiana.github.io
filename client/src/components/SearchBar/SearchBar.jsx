import { useNavigate } from 'react-router';
import { FcSearch } from 'react-icons/fc';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { value } = event.target;
        if (!value || !value.length) navigate("/pokemons");
        else navigate(`/pokemons?search=${value}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className={styles.bar}>
            <form onSubmit={handleSubmit}>
                <div className={styles.bar}>
                    <input className={styles.searchbar} type="search" onChange={handleChange} placeholder="pokemon..." />
                    <FcSearch className={styles.searchicon} />
                </div>
            </form>
        </div>
    )
}