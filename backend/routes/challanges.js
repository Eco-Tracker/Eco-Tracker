var router = require("express").Router();

const {
    getAll,
    getOne,
    deleteChallange,
    getAceptedUserChallenges,
    addChallange,
    updateChallange,
    updateUserChallengeStatus,
} = require("../controller/challanges");
router.get("/get-all", getAll);
router.get("/one/:id", getOne);
router.post("/create-challange", addChallange); // adlin part 
router.put("/update-challange-status/:id", updateUserChallengeStatus);// when the challange is completed update the status
router.put("/update-challange/:id", updateChallange); // update the challange only admin 
router.get("/get-user-challange", getAceptedUserChallenges); // get accepted user challenge and show them in the progress component
router.delete("/delete/:id", deleteChallange);

module.exports = router;