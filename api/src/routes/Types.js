const {Router} = require ("express");
const router = Router();
const {Type} = require("../db");
const axios = require("axios");

router.get("/", async (req, res) => {
    const typesExists = await Type.findAll();
    if (!typesExists.length) {
        const {data: {results}} = await axios.get("https://pokeapi.co/api/v2/type");
        
    }
});

module.exports = router;