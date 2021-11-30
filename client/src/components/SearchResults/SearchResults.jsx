import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router";
import PokemonCard from "../PokemonCard/PokemonCard";
import { getPokemons } from "../../redux/actions";
import { searchPokemon } from "../../Controllers";

export default function SearchResults() {
    const { search } = useLocation();
    let name = search.split("=")[1]
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await searchPokemon(name);
                setSearchResults(data);
                setLoading(false);
            };
            fetchData();
        }   catch (error) {
            console.log(error);
        }
    }, [name]);


    console.log("searchs", searchResults);
    
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

