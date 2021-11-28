import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { getPokemons, changePage } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';

export default function Home() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    console.log(page);
    const firstPage = (event) => {
        navigate("/pokemons/page/1")
    }

    const nextPage = (event) => {
        navigate(`/pokemons/page/${page + 1}`)
    }

    return (
        <div>
            <h1>Henry Pokemons PI</h1>
            <h3>Pokemons</h3>
            <Pokemons page={page}/>
            <input type="button" value="Next Page" onClick={nextPage} />
            <input type="button" value="First Page" onClick={firstPage} />
        </div>
    );
};

