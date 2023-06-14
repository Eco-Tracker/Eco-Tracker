var router = require("express").Router();

const {
    add,
    update,
    getOneByName,
    getOneBylocation,
    getAll, 
    deleteEvent,
    getByUser,
    updateLike,
    updatePart
}= require("../controller/events")
router.get("/", getAll);
router.post("/add", add);
router.put("/:idEV", update);
router.delete("/:idEV",deleteEvent);
router.get("/name/:name", getOneByName);
router.get("/idUser/:id",getByUser);
router.get("/location/:location",getOneBylocation)
router.put("/like/:idEV", updateLike)
router.put("/part/:idEV", updatePart)
module.exports = router;     