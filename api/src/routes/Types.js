const { Router } = require("express");
const router = Router();
const { Type } = require("../db");
const axios = require("axios");

let typesApi = [];

router.get("/", validateType, async (req, res) => {
    if (!typesApi.length) {
        const { data: { results } } = await axios("https://pokeapi.co/api/v2/type/");
        await axios.all(results.map(async type => {
            const { data: { name, id } } = await axios(type.url);
            typesApi.push({ 
                name, 
                id, 
            });
        }))
    }
    
    res.send(typesApi);
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    const type = await Type.create({ name });
    res.send(type);
})

async function validateType(req, res, next) {
    const typesApi = await Type.findAll();
    if (typesApi) return next();

    const { data: { results } } = await axios("https://pokeapi.co/api/v2/type/");
    await axios.all(results.map(async type => {
        const { data: { name, id } } = await axios(type.url);
        await Type.create({ name, id });
    }))
    next();
}



module.exports = router;