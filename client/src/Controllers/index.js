import axios from 'axios';


export const createPokemon = async (pokemon) => {
    try {
        const { data } = await axios.post("http://localhost:3001/pokemons", pokemon);
        return data
    } catch (error) {
        console.log(error)
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



export const getFavorites = async () => {
    let { data: ids } = await axios("http://localhost:3001/favorites");
    const { data: { results } } = await axios("http://localhost:3001/pokemons?getallpokemons=true");
    ids = ids.map(id => id.idPokemon);
    const favorites = results.filter(pokemon => ids.includes(pokemon.id.toString()));
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