import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pokemons from '../Pokemons/Pokemons';
import { deleteAllPokemons } from '../../Controllers';
import axios from 'axios';
import styles from './MyPokemons.module.css';
import Loading from '../Loading/Loading';

export default function MyPokemons() {
    const [mypokemons, setMyPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios('http://localhost:3001/pokemons?filter=db');
            const results = data.results;
            setMyPokemons(results);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleDeleteAll = async (event) => {
        event.preventDefault();
        await deleteAllPokemons();
        setMyPokemons([]);
    }


    if (!mypokemons.length) {
        return <h2>You don´t have any Pokemon created</h2>
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.mypokemons}>
            <div className={styles.header}>
            <input className="back" type="button" value="<< Back" onClick={() => navigate(-1)} />
            <h1>My Pokemons</h1>
            <input className="delete" type="button" value="Delete all pokemons" onClick={handleDeleteAll} />
            </div>
            <div className={styles.pokemons}>
            <Pokemons sepecificPokemons={mypokemons}/>
            </div>
        </div>
    )
}