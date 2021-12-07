import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from "../../redux/actions";
import { deletePokemon } from '../../Controllers';
import Loading from '../Loading/Loading';
import styles from './PokemonDetails.module.css';
import pokeBall from '../../images/pokeBall.png';


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


    const deleteFunction = (event) => {
        event.preventDefault();
        const deleteFunc = async () => {
            try {
                await deletePokemon(pokemonDetails.id);
                navigate(-1);
            } catch (error) {
                console.log(error);
            }
        }
        deleteFunc();
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.pokemondetails}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <input className="back" type="button" value="<< Back" onClick={() => navigate(-1)} />
                    </div>
                    <h2>{pokemonDetails.name}</h2>
                </div>
                <div className={styles.details}>
                    <div className={styles.divimg}>
                        <img src={pokemonDetails.image} alt={pokeBall} />
                    </div>
                    <div className={styles.info}>
                        <h3>Stats: </h3>
                        <p>Hp: {pokemonDetails.hp}</p>
                        <p>Attack: {pokemonDetails.attack}</p>
                        <p>Defense: {pokemonDetails.defense}</p>
                        <p>Speed: {pokemonDetails.speed}</p>
                        <p>Height: {pokemonDetails.height}</p>
                        <p>Weight: {pokemonDetails.weight}</p>
                    </div>
                    <div className={styles.types}>
                        <h3>Types:</h3>
                        <div className={styles.typeslist}>
                            {pokemonDetails.types?.map(type => (
                                <p key={type.id}>{type.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
                {
                    pokemonDetails.isCreated && (
                        <div className={styles.custombtn}>
                            <input className={styles.editbtn} type="button" value="Edit pokemon" onClick={() => navigate(`/pokemons/edit/${pokemonDetails.id}`)} />
                            <input className="delete" type="button" value="Delete pokemon" onClick={deleteFunction} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PokemonDetails;