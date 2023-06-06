var router = require("express").Router();

const {
    register,
    login,
    getOneByName,
    getOneByemail,
    getAll
}= require("../controller/proUser")
router.get("/", getAll);
router.post("/register", register);
router.post("/login", login);
router.get("/:name", getOneByName);
router.get("/:email", getOneByemail)
module.exports = router;     