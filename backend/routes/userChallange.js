var router = require("express").Router();

const {
    getAll,
    startChallange,
    updateChallange,

} = require("../controller/userChallenge");
router.get("/all/:idUser", getAll);
router.post("/start", startChallange); // when user presses start challenge button 
router.put("/update/:id", updateChallange); // update the challange only admin 

module.exports = router;