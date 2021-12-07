import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { searchPokemon } from "../../Controllers";
import Pokemons from "../Pokemons/Pokemons";

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
            <Pokemons specificPokemons={searchResults} />
        </div>
    )
}

