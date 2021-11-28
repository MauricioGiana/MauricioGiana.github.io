import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router";
import { searchPokemon } from "../../redux/actions";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function SearchResults({ name }) {
    const { search } = useLocation();
    const pokemons = useSelector(state => state.pokemons);
    let searchResults = [];
    if (name.length) {
        searchResults = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
    }
    console.log("name", name);
    if (!searchResults.length) {
        return <h2>No results</h2>
    }

    return (
        <div>
            <h2>The results</h2>
            {
                searchResults.map((pokemon) => {
                    return <PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        image={pokemon.image}
                        isFavorite={pokemon.isFavorite}
                    />
                })
            }
        </div>
    )
}

function Child({ name }) {
    return <div>{name}</div>
}

