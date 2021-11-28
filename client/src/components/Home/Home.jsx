import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { getPokemons, changePage } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';
import SearchResults from '../SearchResults/SearchResults';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {search} = useLocation();
    console.log("search:", search);
    let query, value;
    if (search) {
        query = search.slice(1).split('=')[0];
        const parseValue = Number(search.slice(1).split('=')[1])
        value = query === "page" ? parseValue : search.slice(1).split('=')[1];
    }
    const [loading, setLoading] = useState(true);

    const firstPage = (event) => {
        event.preventDefault();
        navigate("/pokemons");
    }

    const nextPage = (event) => {
        event.preventDefault();
        if (query === "page") navigate(`/pokemons?page=${value + 1}`);
        if (!query) navigate(`/pokemons?page=2`);
    }

    const endpoint = typeof value === 'number' ? `${query}=${value}` : "page=1";

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

    const pokemons = useSelector(state => state.pokemons.pokemons);

    if (query === "search" && value.length) {
        return (
            <div>
                <h2>Search results</h2>
                <SearchResults name={value}/>
            </div>
        )
    }

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

