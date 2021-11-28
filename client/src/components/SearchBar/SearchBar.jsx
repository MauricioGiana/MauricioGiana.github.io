import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'; 
import { useNavigate } from 'react-router';
import { searchPokemon } from '../../redux/actions';


export default function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {value} = event.target;
        if (!value || !value.length) navigate("/pokemons");
        else navigate(`/pokemons/search/${value}`);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="search" onChange={handleChange}/>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}