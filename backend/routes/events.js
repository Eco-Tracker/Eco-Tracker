var router = require("express").Router();

const {
    add,
    update,
    getOneByName,
    getOneBylocation,
    getAll
}= require("../controller/events")
router.get("/", getAll);
router.post("/add", add);
router.post("/update", update);
router.get("/:name", getOneByName);
router.get("/:location",getOneBylocation)
module.exports = router;     