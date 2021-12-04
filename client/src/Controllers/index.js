import axios from 'axios';


export const createPokemon = async (pokemon) => {
    try {
        const { data } = await axios.post("http://localhost:3001/pokemons", pokemon);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const searchPokemon = async (name) => {
    const { data } = await axios(`http://localhost:3001/pokemons?getallpokemons=true`);
    const filteredPokemons = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
    return filteredPokemons;
}

export const editPokemon = async (idPokemon, pokemon) => {
    const { data } = await axios.put(`http://localhost:3001/pokemons/edit/${idPokemon}`, pokemon);
    return data
}

export const deletePokemon = async (idPokemon) => {
    const { data } = await axios.delete(`http://localhost:3001/pokemons/delete/${idPokemon}`);
    return data
}

export const deleteAllPokemons = async () => {
    const { data } = await axios.delete(`http://localhost:3001/pokemons/clearcreatedpokemons`);
    return data
}

export const getIds = async () => {
    const {data: ids} = await axios("http://localhost:3001/favorites");
    console.log("ids",ids);
    return ids;
}

export const getFavorites = async (ids) => {
    const {data: pokemons} = await axios("http://localhost:3001/pokemons?getallpokemons=true");
    const favorites = pokemons.results.filter(pokemon => ids.includes(pokemon.id));
    console.log("favorites", favorites);
    return favorites;
}

export const addFavorite = async (idPokemon) => {
    const { data } = await axios.post(`http://localhost:3001/favorites/add/${idPokemon}`);
    console.log("add", data);
    return data;
}

export const quitFavorite = async (idPokemon) => {
    const { data } = await axios.delete(`http://localhost:3001/favorites/quit/${idPokemon}`);
    console.log("delete", data);
    return data
}

export const deletaAllFavorites = async () => {
    const { data } = await axios.delete(`http://localhost:3001/favorites/deleteall`);
    return data
}