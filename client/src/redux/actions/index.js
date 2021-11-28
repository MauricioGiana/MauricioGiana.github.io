import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = "GET_POKEMON";
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_TYPE = 'CREATE_TYPE';
export const GET_POKEMONS_BY_TYPE = 'GET_POKEMONS_BY_TYPE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const CHANGE_PAGE = 'CHANGE_PAGE';

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
    if (endpoint.split("=").length === 2) {
        const { data } = await axios(`http://localhost:3001/pokemons?${endpoint}`)
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
            payload: data
        })
    }
}

export const createPokemon = (pokemon) => {
    return async dispatch => {
        const { data } = await axios.post("http://localhost:3001/pokemons", pokemon);
        dispatch({
            type: CREATE_POKEMON,
            payload: data
        })
    }
}

export const createType = (type) => {
    return async dispatch => {
        const { data } = await axios.post("http://localhost:3001/types", type);
        dispatch({
            type: CREATE_TYPE,
            payload: data
        })
    }
}

export const getPokemonsByType = (type) => {
    return async dispatch => {
        const { data } = await axios("http://localhost:3001/pokemons");
        const pokemonsFiltered = data.filter(pokemon => pokemon.types.some(t => t.name === type));
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

export const searchPokemon = (name) => dispatch => {
    dispatch({
        type: SEARCH_POKEMON,
        payload: name
    })
}

export const changePage = (page) => dispatch => {
    dispatch({
        type: CHANGE_PAGE,
        payload: page
    })
}




