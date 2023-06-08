var router = require("express").Router();

const {
    register,
    login,
    getOneByName,
    getOneByemail,
    getAll,
    updatePro,
    deletePro,
    getOneById
}= require("../controller/proUser")
router.get("/", getAll);
router.post("/register", register);
router.post("/login", login);
router.get("/id/:id",getOneById)
router.get("/name/:name", getOneByName);
router.get("/email/:professionalMail", getOneByemail);
router.put("/:id",updatePro);
router.delete("/:id",deletePro)
module.exports = router;     