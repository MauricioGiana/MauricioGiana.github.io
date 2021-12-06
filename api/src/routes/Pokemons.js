const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const fetchPokemons = require('../utils');

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
        if (req.query.getallpokemons) {
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
        if (created && types && types.length) {
            const typesDb = await Type.findAll({ where: { name: types } });
            pokemon.addTypes(typesDb);
            res.status(200).json(pokemon)
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
        const deletedPokemons = await Pokemon.destroy({ where: {} });
        return res.json({ message: "All pokemons deleted" });
    } catch (error) {
        next(error);
    }
});



module.exports = router;






