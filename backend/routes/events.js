var router = require("express").Router();

const {
    add,
    update,
    getOneByName,
    getOneBylocation,
    getAll, 
    deleteEvent
}= require("../controller/events")
router.get("/", getAll);
router.post("/add", add);
router.put("/:idEV", update);
router.delete("/:idEV",deleteEvent);
router.get("/:name", getOneByName);
router.get("/:location",getOneBylocation)
module.exports = router;     