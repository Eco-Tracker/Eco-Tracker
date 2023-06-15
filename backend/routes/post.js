var router = require("express").Router();

const {
    register,
    getOneByTitle,
    getAll,
    deleteOneByTitle,
    updateOneByTitle,
    updateOneByLike,
    getPostUser,
    deletePost
}= require("../controller/post")
router.get("/", getAll);
router.post("/register", register);
router.get("/:post_Id", getOneByTitle);
router.delete("/:title", deleteOneByTitle);
router.put("/:post_Id", updateOneByTitle);
router.put("/like/:post_Id", updateOneByLike);
router.get("/user/:id",getPostUser);
router.delete("/del/:post_Id", deletePost);





module.exports = router;     