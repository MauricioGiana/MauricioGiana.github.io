const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');


const totalPokemons = 898;
const totalPages = 75;

let pokemonsApi;
let response;

router.get("/", async (req, res, next) => {
    try {
        if (req.query.name) {
            const pokemonApi = await fetchPokemons(req.query.name);
            const pokemonDb = await Pokemon.findOne({ where: { name: req.query.name } });
            if (pokemonApi) return res.json(pokemonApi);
            if (pokemonDb) return res.json(pokemonDb);
            return res.status(404).json({ message: "Pokemon not found" });
        }
        const pokemonsDb = await Pokemon.findAll({
            attributes: ['id', 'name', 'image', 'attack', "isCreated"],
        });
        if (req.query.filter === "db") response = pokemonsDb;
        if (!pokemonsApi) pokemonsApi = await fetchPokemons();
        if (req.query.filter === "api") response = pokemonsApi;
        if (!req.query.filter) response = [...pokemonsApi, ...pokemonsDb];
        /* if (req.query.type) {
            const pokemonsFiltered = pokemons.filter(pokemon => pokemon.types.some(type => type.name === req.query.type));
            return res.json(pokemonsFiltered);
        } */
        if (req.query.order) {
            const { order } = req.query;
            const [prop, ord] = order.split("-");
            if (ord === "asc") response.sort((a, b) => {
                if (a[prop] > b[prop]) return 1;
                if (a[prop] < b[prop]) return -1;
                return 0;
            })
            else response.sort((a, b) => {
                if (a[prop] < b[prop]) return 1;
                if (a[prop] > b[prop]) return -1;
                return 0;
            })
        }
        /* if (req.query.search) {
            const { search } = req.query;
            response = response.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
        } */
        const totalPages = Math.ceil(response.length / 6);
        if(req.query.getallpokemons) {
            return res.json({
                totalPages,
                results: response
            });
        }
        if (req.query.page) {
            const { page } = req.query;
            if (1 > page > totalPages) return res.status(400).json({ msg: "Page not found" })
            let end = page * 6; start = end - 6;
            return res.json({
                totalPages,
                results: response.slice(start, end)
            });
        }
        res.json({
            totalPages,
            results: response.slice(0, 6)
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
    const pokemonApi = await fetchPokemons(idPokemon);
    const pokemonDb = await Pokemon.findOne({ where: { id: idPokemon } });
    if (pokemonApi) return res.json(pokemonApi);
    if (pokemonDb) return res.json(pokemonDb);
    return res.status(404).json({ message: "Pokemon not found" });
});

router.post("/", async (req, res, next) => {
    const {
        name, image, height, weight, hp, attack, defense, speed, types
    } = req.body;
    try {
        const [pokemon, created] = await Pokemon.findOrCreate({
            where: { name },
            defaults: {
                name, image, height, weight, hp, attack, defense, speed
            }
        });
        if (created) {
            /* await pokemon.addTypes(types); */
            res.status(302).json(pokemon);
        } else {
            res.status(400).json({ message: "Pokemon already exists" });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/edit/:idPokemon", async (req, res, next) => {
    const {
        name, image, height, weight, hp, attack, defense, speed, types
    } = req.body;
    const { idPokemon } = req.params;
    try {
        if (idPokemon) {
            const newParams = {};
            const params = {
                name, image, height, weight, hp, attack, defense, speed, types
            }
            for (let key in params) {
                if (params[key]) newParams[key] = params[key];
            }
            await Pokemon.update(newParams, { where: { id: idPokemon } });
            res.json({ message: "Pokemon edited successfuly" });
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:idPokemon", async (req, res, next) => {
    const { idPokemon } = req.params;
    try {
        if (idPokemon) {
            const deletedPokemon = await Pokemon.destroy({ where: { id: idPokemon } });
            return res.json({ message: "Pokemon deleted" });
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/clearcreatedpokemons", async (req, res, next) => {
    try {
        const deletedPokemons = await Pokemon.destroy({where: {}});
        return res.json({ message: "All pokemons deleted" });
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
                                name: result.data.name[0].toUpperCase() + result.data.name.slice(1),
                                id: result.data.id,
                                attack: result.data.stats[1].base_stat,
                                image: result.data.sprites.other.home.front_default,
                                types: result.data.types.map(type => ({
                                    name: type.type.name,
                                    id: type.type.url.split("/").slice(-2)[0]
                                })),
                            });
                        });
                    }
                    )
                return pokemons
            }
        }
    }
    try {
        const { data } = await axios(url);
        return {
            name: data.name[0].toUpperCase() + data.name.slice(1),
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
                id: type.type.url.split("/").slice(-2)[0]
            })),
        }
    }   catch (error) {
        return null;
    }
}

const axiosPokemons = async () => {
    const {data: page1} = await axios("https://pokeapi.co/api/v2/pokemon");

    const nextPage = page1.next;
    
    const pokemons1 = await axios.all(page1.results.map(async (result) => {
        const {data} = await axios(result.url);
        return {
            name: data.name,
            id: data.id,
        }
    }));

    const {data: page2} = await axios(nextPage);

    const pokemons2 = await axios.all(page2.results.map(async (result) => {
        const {data} = await axios(result.url);
        return {
            name: data.name,
            id: data.id,
        }
    }));
    const totalPokemons = [...pokemons1, ...pokemons2];
}



