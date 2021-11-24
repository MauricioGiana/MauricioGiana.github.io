const {Router} = require ("express");
const router = Router();

router.get("/", (req, res) => {
    res.send("favorites")
});

module.exports = router;