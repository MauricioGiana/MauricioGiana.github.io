import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from "../../redux/actions";
import PokemonCard from '../PokemonCard/PokemonCard';


const Favorites = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const favorites = useSelector(state => state.favorites);
    console.log(favorites);
    return (
        <div className="favorites">
            <h1>Favorites</h1>
            {
                favorites.map(pokemon => (
                    <PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                    />
                ))
            }
        </div>
    )
}

export default Favorites;