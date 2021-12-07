import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletaAllFavorites } from '../../Controllers';
import { getFavorites } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';
import styles from './Favorites.module.css';


const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getFavorites());
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);



    return (
        <div className="favorites">
            <div className={styles.header}>
                <div className={styles.main}>
                    <input className="back" type="button" value="Back" onClick={() => navigate('/pokemons')} />
                    <h1 className={styles.title}>Favorites</h1>
                </div>
                {
                    !loading && favorites.length > 0 && <input className="delete" type="button" value="Delete all favorites" onClick={deletaAllFavorites} />
                }
            </div>
            {
                loading && <h2>Loading...</h2>
            }
            {
                !loading && favorites.length === 0 && <h2>No favorites</h2>
            }
            {
                favorites.length > 0 && (
                    <div>
                        <Pokemons specificPokemons={favorites} />
                    </div>
                )
            }
        </div>
    )
}

export default Favorites;


