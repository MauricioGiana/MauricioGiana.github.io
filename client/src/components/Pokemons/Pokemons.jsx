import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import PokemonCard from '../PokemonCard/PokemonCard';
import { getPokemons } from '../../redux/actions';

export default function Pokemons() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let endpoint = useLocation().search;
    endpoint = endpoint.length ? endpoint : false;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemons(endpoint));
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [endpoint, dispatch]);

    console.log("endpoint", endpoint)

    const pokemons = useSelector(state => state.pokemons);

    if (loading) return <h2>Loading...</h2>
    if (!pokemons.length) return <h2>No pokemons found</h2>

    return (
        <div>
            {
                pokemons?.map((pokemon) => {
                    return <PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        image={pokemon.image}
                        isFavorite={pokemon.isFavorite}
                    />
                })
            }
        </div>
    );
};





