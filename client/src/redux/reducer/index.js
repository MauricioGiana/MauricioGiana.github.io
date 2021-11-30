import { GET_POKEMON, GET_POKEMONS, CREATE_POKEMON, 
    GET_TYPES, CREATE_TYPE, GET_POKEMONS_BY_TYPE, 
    ADD_FAVORITE, SEARCH_POKEMON, CHANGE_PAGE } from "../actions";


const initialState = {
    pokemons: [],
    allPokemons: [],
    totalPages: 0,
    pokemon: {},
    types: [],
    type: {},
    favorites: [],
    searchResults: []
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload.results,
                totalPages: payload.totalPages
            };
        case GET_POKEMON:
            return {
                ...state,
                pokemon: payload
            };
        case CREATE_POKEMON:
            return {
                ...state,
                pokemon: payload
            };
        case GET_TYPES:
            return {
                ...state,
                types: payload
            };
        case GET_POKEMONS_BY_TYPE:
            return {
                ...state,
                pokemons: payload
            };
        case SEARCH_POKEMON:
            return {
                ...state,
                searchResults: payload
            };
        /* case CHANGE_PAGE:
            return {
                ...state,
                page: payload
            }; */
        default: return state;
    }
};

export default rootReducer;