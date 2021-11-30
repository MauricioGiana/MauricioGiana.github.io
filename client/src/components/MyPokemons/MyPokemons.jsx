import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from "../../redux/actions";
import Pokemons from '../Pokemons/Pokemons';
import { deleteAllPokemons } from '../../Controllers';
import axios from 'axios';

export default function MyPokemons() {
    const dispatch = useDispatch();
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
    })

    const handleDeleteAll = async (event) => {
        event.preventDefault();
        const data = await deleteAllPokemons();
        setMyPokemons([]);
    }


    if (!mypokemons.length) {
        return <h2>You don´t have any Pokemon created</h2>
    }


    return (
        <div>
            <h1>My Pokemons</h1>
            <input type="button" value="Back" onClick={() => navigate(-1)} />
            <input type="button" value="Delete all pokemons" onClick={handleDeleteAll} />
            <Pokemons mypokemons={mypokemons}/>
        </div>
    )
}