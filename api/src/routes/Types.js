const { Router } = require("express");
const router = Router();
const { Type } = require("../db");
const axios = require("axios");



router.get("/", async (req, res) => {
    const types = await Type.findAll();
    if (!types || !types.length) {
        const { data: { results } } = await axios("https://pokeapi.co/api/v2/type");
        await axios.all(results.map(async type => {
            const { data: { name, id } } = await axios(type.url);
            await Type.create({ name, id });
        }))
        return res.json(await Type.findAll());
    }
    res.json(types);
});

module.exports = router;