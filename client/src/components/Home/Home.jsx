import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { getPokemons, changePage } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {search} = useLocation();
    console.log("search:", search);
    const page = search.length ? Number(search.split('=')[1]) : 1;
    const [loading, setLoading] = useState(true);

    
    const firstPage = (event) => {
        navigate("/pokemons?page=1");
    }

    const nextPage = (event) => {
        navigate(`/pokemons?page=${page + 1}`)
    }
    console.log("pagenumber: ", page);

    const endpoint = typeof page === 'number' ? `page=${page}` : "page=1";

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
    }, [page]);

    const pokemons = useSelector(state => state.pokemons.pokemons);
    console.log("pokemons: ", pokemons);

    return (
        <div>
            <h1>Henry Pokemons PI</h1>
            <h3>Pokemons</h3>
            {
                loading ? <h1>Loading...</h1> : <Pokemons />
            }
            <input type="button" value="Next Page" onClick={nextPage} />
            <input type="button" value="First Page" onClick={firstPage} />
        </div>
    );
};

