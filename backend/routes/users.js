var router = require("express").Router();

const {
    register,
    getOneByName,
    getAllUsers,
    getOneById,
    deleteUser,
    getOneByemail,
    updateUser
}= require("../controller/users")
router.get("/", getAllUsers);
router.post("/register", register);
router.get("/name/:name", getOneByName);
router.get("/id/:id",getOneById);
router.put("/:id",updateUser);
<<<<<<< HEAD
router.get("email/:mail",getOneByemail)
=======
router.get("/email/:mail",getOneByemail)
>>>>>>> b2df40cfd2b2b7736b86263de1fcd8c8939652c0
router.delete("/:id",deleteUser)
module.exports = router;