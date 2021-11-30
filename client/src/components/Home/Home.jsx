import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { getPokemons, getTypes } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';
import SearchResults from '../SearchResults/SearchResults';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination/Pagination';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let endpoint = useLocation().search;
    endpoint = endpoint.length > 0 ? endpoint : false;
    const [loading, setLoading] = useState(true);
    const totalRecords = useSelector(state => state.totalPages);

    const firstPage = (event) => {
        navigate("/pokemons");
    }

    const nextPage = (event) => {
        if (endpoint.includes("page")) {
            let page = parseInt(endpoint.split("=")[1]);
            let newEndpoint = endpoint.split("page=")[0] + "page=" + (page + 1);
            let cutPoint = endpoint.indexOf("&");
            if (cutPoint > 0) newEndpoint += endpoint.slice(cutPoint);
            navigate(`/pokemons${newEndpoint}`);
        }
        else if (!endpoint) navigate(`/pokemons?page=2`);
    }

    

    return (
        <div>
            <h1>Henry Pokemons PI</h1>
            <h3>Pokemons</h3>
            <Filters />
            <Pokemons/>
            <input type="button" value="Next Page" onClick={nextPage} />
            <input type="button" value="First Page" onClick={firstPage} />
            {
                [1, 2, 3].map(page => {
                    return <input type="button" value={page} onClick={() => navigate(`/pokemons?page=${page}`)} />
                })
            }
        </div>
    );
};

