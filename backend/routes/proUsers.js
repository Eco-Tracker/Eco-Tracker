var router = require("express").Router();

const {
    register,
    login,
    getOneByName,
    getOneByemail,
    getAll,
    updatePro,
    deletePro
}= require("../controller/proUser")
router.get("/", getAll);
router.post("/register", register);
router.post("/login", login);
router.get("/:name", getOneByName);
router.get("/:email", getOneByemail);
router.put("/:id",updatePro);
router.delete("/:id",deletePro)
module.exports = router;     