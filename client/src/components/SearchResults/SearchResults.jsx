import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router";
import PokemonCard from "../PokemonCard/PokemonCard";
import { getPokemons, searchPokemon } from "../../redux/actions";

export default function SearchResults({ name }) {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchData = async () => {
                await dispatch(getPokemons("?getallpokemons=true"));
                dispatch(searchPokemon(search));
                setLoading(false);
            };
            fetchData();
        }   catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    const searchResults = useSelector(state => state.searchResults);
    
    if (loading) {
        return <div>Loading results...</div>
    }

    if (!searchResults.length) {
        return <h2>No results</h2>
    }

    return (
        <div>
            <h2>Search results: </h2>
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

