import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from "../../redux/actions";
import { deletePokemon } from '../../Controllers';


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

    const deleteFunction = (event) => {
        event.preventDefault();
        const deleteFunc = async () => {
            try {
                const data = await deletePokemon(pokemonDetails.id);
                navigate(-1);
            } catch (error) {
                console.log(error);
            }
        }
        deleteFunc();
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <div>
                <input type="button" value="Go Back" onClick={() => navigate(-1)} />
            </div>
            {
                pokemonDetails.isCreated && (
                    <div>
                        <input type="button" value="Edit pokemon" onClick={() => navigate(`/pokemons/edit/${pokemonDetails.id}`)} />
                        <input type="button" value="Delete pokemon" onClick={deleteFunction}/>
                    </div>
                )
            }
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