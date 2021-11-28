import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router";
import { searchPokemon } from "../../redux/actions";
import PokemonCard from "../PokemonCard/PokemonCard";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

export default function SearchResults() {
    const {name} = useParams();
    const pokemons = useSelector(state => state.pokemons);
    const searchResults = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));


    return (
        <div>
                {
                    searchResults?.map((pokemon) => {
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