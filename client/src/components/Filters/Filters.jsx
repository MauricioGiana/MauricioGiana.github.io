import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { getTypes, getPokemonsByType } from '../../redux/actions';

export default function Filters() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getTypes());
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { value } = event.target;
        if(value === "All") navigate('/pokemons');
        if(value === "Existing") navigate('/pokemons?page=1&filter=api');
        if(value === "Created") navigate('/pokemons?page=1&filter=db');
        if(value === "nameAsc") navigate('/pokemons?page=1&order=name-asc');
        if(value === "nameDes") navigate('/pokemons?page=1&order=name-des');
        if(value === "attackAsc") navigate('/pokemons?page=1&order=attack-asc');
        if(value === "attackDes") navigate('/pokemons?page=1&order=attack-des');
    }

    const filterTypes = async (event) => {
        event.preventDefault();
        const { value } = event.target;
        try {
            await dispatch(getPokemonsByType(value));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>Filters</h3>
            <form>
                <label>Origin</label>
                <select onChange={handleSubmit}>
                    <option value="All">All</option>
                    <option value="Existing">Existing</option>
                    <option value="Created">Created</option>
                </select>
                <label>By type</label>
                <select onClick={filterTypes}>
                    {
                        types.map(type => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))
                    }
                </select>
                <label>Order by name</label>
                <select onChange={handleSubmit}>
                    <option value="nameAsc">Ascendant</option>
                    <option value="nameDes">Descendant</option>
                </select>
                <label>Order by attack</label>
                <select onChange={handleSubmit}>
                    <option value="attackAsc">Ascendant</option>
                    <option value="attackDes">Descendant</option>
                </select>
            </form>
        </div>
    )
}