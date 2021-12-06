import React, { useState, useEffect, useS } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFavorites, deletaAllFavorites } from '../../Controllers';
import Pokemons from '../Pokemons/Pokemons';


const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchData = async () => {
            const favs = await getFavorites();
            setFavorites(favs);
            /* console.log("favs", favorites); */
            setLoading(false);
        }
        fetchData();
    }, []);

    
    
    return (
        <div className="favorites">
            <h1>Favorites</h1>
            {
                loading && <h2>Loading...</h2>
            }
            {
                !loading && favorites.length === 0 && <h2>No favorites</h2>
            }
            {
                favorites.length > 0 && (
                    <div>
                        <input type="button" value="Back" onClick={() => navigate('/pokemons')} />
                        <input type="button" value="Delete all favorites" onClick={deletaAllFavorites} />
                        <Pokemons sepecificPokemons={favorites} />
                    </div>
                )
            }
        </div>
    )
}

export default Favorites;


