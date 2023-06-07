var router = require("express").Router();

const {
    add,
    update,
    getAll, 
    deleteComment,
    getOneComment
}= require("../controller/comments")
router.get("/", getAll);
router.post("/add", add);
router.put("/:id", update);
router.delete("/:id",deleteComment);
router.get("/:post_Id",getOneComment);

module.exports = router;     