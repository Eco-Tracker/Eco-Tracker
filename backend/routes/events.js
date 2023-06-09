var router = require("express").Router();

const {
    add,
    update,
    getOneByName,
    getOneBylocation,
    getAll, 
    deleteEvent,
    getByUser
}= require("../controller/events")
router.get("/", getAll);
router.post("/add", add);
router.put("/:idEV", update);
router.delete("/:idEV",deleteEvent);
router.get("/name/:name", getOneByName);
router.get("/idUser/:id",getByUser);
router.get("/location/:location",getOneBylocation)
module.exports = router;     