import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from "../../redux/actions";


const PokemonDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemon(id));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id, dispatch, setLoading]);

    const pokemonDetails = useSelector(state => state.pokemon);
    console.log("result:", pokemonDetails);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <div>
                <input type="button" value="Go Back" onClick={() => navigate(-1)} />
            </div>
            <h2>{pokemonDetails.name}</h2>
            <img src={pokemonDetails.image} alt={pokemonDetails.name} />
            <p>Id: {pokemonDetails.id}</p>
            <h4>Stats</h4>
            <p>Hp: {pokemonDetails.hp}</p>
            <p>Attack: {pokemonDetails.attack}</p>
            <p>Defense: {pokemonDetails.defense}</p>
            <p>Speed: {pokemonDetails.speed}</p>
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <h4>Types:</h4>
            {pokemonDetails.types?.map(type => (
                <p key={type.id}>{type.name}</p>
            ))}
        </div>
    )
}

export default PokemonDetails;