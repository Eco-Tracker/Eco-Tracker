var router = require("express").Router();

const {
    register,
    getOneByTitle,
    getAll,
    deleteOneByTitle,
    updateOneByTitle,
    updateOneByLike
}= require("../controller/post")
router.get("/", getAll);
router.post("/register", register);
router.get("/:title", getOneByTitle);
router.delete("/:title", deleteOneByTitle);
router.put("/:post_Id", updateOneByTitle);
router.put("/like/:post_Id", updateOneByLike);





module.exports = router;     