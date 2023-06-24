var router = require("express").Router();

const {
    register,
    getOneByName,
    getAllUsers,
    getOneById,
    deleteUser,
    getOneByemail,
    updateUser,
    bannUser
}= require("../controller/users")
router.get("/", getAllUsers);
router.post("/register", register);
router.get("/name/:name", getOneByName);
router.get("/id/:id",getOneById);
router.put("/:id",updateUser);
router.put("/bann/:id",bannUser);
router.get("/email/:mail",getOneByemail)
router.delete("/:id",deleteUser)
module.exports = router; 