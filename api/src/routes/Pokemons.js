const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');


const totalPokemons = 898;
const totalPages = 75;
let pokemons;


router.get("/", async (req, res, next) => {
    if (req.query.name) {
        const pokemon = await fetchPokemons(req.query.name);
        res.send(pokemon)
    }
    const pokemonsDb = await Pokemon.findAll();
    if (!pokemons) pokemons = await fetchPokemons();

    
    

    
    res.send(pokemons);

});

router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
    const data = await fetchPokemons(idPokemon);
    res.send(data);
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
        await result.get(15, 30);
        await result.get(30, 40);
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
                    .then(axios.spread((...args) => {
                        args.forEach(arg => {
                            pokemons.push({
                                name: arg.data.name,
                                id: arg.data.id,
                                image: arg.data.sprites.other?.home.front_default,
                                types: arg.data.types.map(type => ({
                                    name: type.type.name,
                                    id: type.slot
                                }))
                            });
                        });
                    }
                    ))
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

async function getPokeNames() {
    const { data: result1 } = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const { data: result2 } = await axios.get(result1.next);
    const results = [...result1.results.map(res => res.name), ...result2.results.map(res => res.name)];
    return results;
}



