import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = "GET_POKEMON";
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_TYPE = 'CREATE_TYPE';
export const GET_POKEMONS_BY_TYPE = 'GET_POKEMONS_BY_TYPE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const EDIT_POKEMON = 'EDIT_POKEMON';
export const DELETE_POKEMON = "DELETE_POKEMON";
export const DELETE_ALL_POKEMONS = "DELETE_ALL_POKEMONS";

/* 
query name
query filter db api
query type
query order
query page
params id
 */

const fetchPokemon = async (endpoint) => {
    if (!endpoint) {
        const { data } = await axios("http://localhost:3001/pokemons")
        return data;
    }
    if (endpoint.split("=").length > 1) {
        const { data } = await axios(`http://localhost:3001/pokemons${endpoint}`)
        return data;
    }
    const { data } = await axios(`http://localhost:3001/pokemons/${endpoint}`)
    return data;
}

export const getPokemons = (endpoint) => {
    return async dispatch => {
        const result = await fetchPokemon(endpoint);
        dispatch({
            type: GET_POKEMONS,
            payload: result
        })
    }
}

export const getPokemon = (nameOrId) => {
    return async dispatch => {
        const result = await fetchPokemon(nameOrId);
        dispatch({
            type: GET_POKEMON,
            payload: result
        })
    }
}


export const getTypes = () => {
    return async dispatch => {
        const { data } = await axios("http://localhost:3001/types");
        dispatch({
            type: GET_TYPES,
            payload: data.sort((a, b) => a.id - b.id)
        })
    }
}




export const getPokemonsByType = (type) => {
    return async dispatch => {
        const { data } = await axios("http://localhost:3001/pokemons?getallpokemons=true");
        const pokemonsFiltered = data.results.filter(pokemon => pokemon.types?.some(t => t.name === type));
        dispatch({
            type: GET_POKEMONS_BY_TYPE,
            payload: pokemonsFiltered
        })
    }
}

export const addFavorite = (id) => dispatch => {
    dispatch({
        type: ADD_FAVORITE,
        payload: id
    })
}













