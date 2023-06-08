var router = require("express").Router();

const {
    register,
    getOneByName,
    getAllUsers,
    getOneById,
    deleteUser,
    updateUser
}= require("../controller/users")
router.get("/", getAllUsers);
router.post("/register", register);
router.get("/:name", getOneByName);
router.get("/:id",getOneById);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser)
module.exports = router;