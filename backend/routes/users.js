var router = require("express").Router();

const {
    register,
    getOneByName,
    getAllUsers,
}= require("../controller/users")
router.get("/", getAllUsers);
router.post("/register", register);
router.get("/:name", getOneByName);
module.exports = router;