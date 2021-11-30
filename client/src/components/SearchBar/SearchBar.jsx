import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { searchPokemon } from '../../redux/actions';
import SearchResults from '../SearchResults/SearchResults';


export default function SearchBar() {
    const navigate = useNavigate();
    const { search } = useLocation();
    console.log(search);

    const handleChange = (event) => {
        const { value } = event.target;
        if (!value || !value.length) navigate("/pokemons");
        else navigate(`/pokemons?search=${value}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="search" onChange={handleChange} />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}