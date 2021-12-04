import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import PokemonCard from '../PokemonCard/PokemonCard';
import { getPokemons } from '../../redux/actions';
import styles from './Pokemons.module.css';

export default function Pokemons({ sepecificPokemons }) {
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

    let pokemons = useSelector(state => state.pokemons);

    if (sepecificPokemons) pokemons = sepecificPokemons;

    if (loading) return <h1>Loading...</h1>
    if (!pokemons.length) return <h2>No pokemons found</h2>

    return (
        <div className={styles.pokemon}>
            {
                pokemons?.map((pokemon) => {
                    return <PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        image={pokemon.image}
                        isCreated={pokemon.isCreated}
                    />
                })
            }
        </div>
    );
};





