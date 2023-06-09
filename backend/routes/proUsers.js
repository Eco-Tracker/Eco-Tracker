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
<<<<<<< HEAD
router.get("/name/:professionalName", getOneByName);
router.get("/email/:email", getOneByemail);
router.put("/updateuser/:id",updatePro);
=======
router.get("/name/:name", getOneByName);
router.get("/email/:professionalMail", getOneByemail);
router.put("/:id",updatePro);
>>>>>>> b2df40cfd2b2b7736b86263de1fcd8c8939652c0
router.delete("/:id",deletePro)
module.exports = router;     