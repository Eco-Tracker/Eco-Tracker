var router = require("express").Router();

const {
    add,
    update,
    getAll, 
    deleteComment,
    getOneComment,
    getByUser
}= require("../controller/comments")
router.get("/", getAll);
router.post("/add", add);
router.put("/:id", update);
router.delete("/:id",deleteComment);
router.get("/post/:post_Id",getOneComment);
router.get("/user/:id",getByUser);
module.exports = router;     