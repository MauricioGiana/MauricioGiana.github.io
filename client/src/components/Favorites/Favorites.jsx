import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIds, getFavorites, deletaAllFavorites } from '../../Controllers';
import Pokemons from '../Pokemons/Pokemons';


const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const [ids, setIds] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIds();
                setIds(data);
                const favorites = await getFavorites(ids);
                setFavorites(favorites);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [ids])


    return (
        <div className="favorites">
            <h1>Favorites</h1>
            {
                loading && <h2>Loading...</h2>
            }
            {
                !loading && !favorites.length && <h2>No favorites</h2>
            }
            {
                !loading && favorites.length > 0 && (
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


