const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');


const totalPokemons = 898;
const totalPages = 75;

let pokemonsApi;

router.get("/", async (req, res, next) => {
    if (req.query.name) {
        const pokemonApi = await fetchPokemons(req.query.name);
        const pokemonDb = await Pokemon.findOne({ where: { name: req.query.name } });
        if (pokemonApi && pokemonDb) return res.json([pokemonApi, pokemonDb]);
        if (pokemonApi) return res.json(pokemonApi);
        if (pokemonDb) return res.json(pokemonDb);
        return res.status(404).json({ message: "Pokemon not found" });
    }
    const pokemonsDb = await Pokemon.findAll();
    if (req.query.filter === "db")  return res.json(pokemonsDb);
    if (!pokemonsApi) pokemonsApi = await fetchPokemons();
    if (req.query.filter === "api") return res.json(pokemonsApi);
    const pokemons = [...pokemonsApi, ...pokemonsDb];
    if (req.query.type) {
        const pokemonsFiltered = pokemons.filter(pokemon => pokemon.types.some(type => type.name === req.query.type));
        return res.json(pokemonsFiltered);
    }
    if (req.query.order) {
        const {order} = req.query;
        const [prop, ord] = order.split("-");
        if (ord === "asc") pokemons.sort((a, b) => {
            if (a[prop] > b[prop]) return 1;
            if (a[prop] < b[prop]) return -1;
            return 0;
        })
        else pokemons.sort((a, b) => {
            if (a[prop] < b[prop]) return 1;
            if (a[prop] > b[prop]) return -1;
            return 0;
        })
    }
    if (req.query.page) {
        const {page} = req.query;
        const totalPages = Math.ceil(pokemons.length / 6);
        if (page > totalPages) return res.status(400).json({msg: "Page not found"})
        let end = page * 6; start = end - 6;
        return res.json(pokemons.slice(start, end));
    }
    res.json(pokemons);
});

router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
    const pokemonApi = await fetchPokemons(idPokemon);
    const pokemonDb = await Pokemon.findOne({ where: { id: idPokemon } });
    if (pokemonApi && pokemonDb) return res.json([pokemonApi, pokemonDb]);
    else if (pokemonApi) return res.json(pokemonApi);
    else if (pokemonDb) return res.json(pokemonDb);
    return res.status(404).json({ message: "Pokemon not found" });
});

router.post("/", async (req, res, next) => {
    const {
        name, image, height, weight, hp, attack, defense, speed, types
    } = req.body;
    try {
        const pokemonExists = await Pokemon.findOne({
            where: { name }
        });
        if (pokemonExists) return res.status(400).send({ message: "Pokemon with this name already exists" });
        const pokemon = await Pokemon.create({
            name, image, height, weight, hp, attack, defense, speed
        });
        res.status(302).send(pokemon);
    } catch (error) {
        next(error);
    }
});

module.exports = router;


async function fetchPokemons(argument) {
    let url;
    if (!argument) {
        url = "https://pokeapi.co/api/v2/pokemon";
        const result = await fetchFunc(url);
        await result.get(0, 15);
        /* await result.get(15, 30);
        await result.get(30, 40); */
        return result.pokemons;
    } 
    url = `https://pokeapi.co/api/v2/pokemon/${argument}`;
    const result = await fetchFunc(url);
    return result;
}

async function fetchFunc(url) {
    if (url.split("/").pop() === "pokemon") {
        const { data: res1 } = await axios(url);
        const { data: res2 } = await axios(res1.next);
        const results = [...res1.results, ...res2.results];
        const pokemons = [];
        return {
            pokemons,
            get: async (start, end) => {
                await axios.all(results.slice(start, end).map(result => axios(result.url)))
                    .then((response) => {
                        response.forEach(result => {
                            pokemons.push({
                                name: result.data.name,
                                id: result.data.id,
                                attack: result.data.stats[1].base_stat,
                                image: result.data.sprites.other.home.front_default,
                                types: result.data.types.map(type => ({
                                    name: type.type.name,
                                    id: type.slot
                                }))
                            });
                        });
                    }
                    )
                return pokemons
            }
        }
    } 
    const { data } = await axios(url);
    return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        image: data.sprites.other?.home.front_default,
        types: data.types.map(type => ({
            name: type.type.name,
            id: type.slot
        }))
    }
}





