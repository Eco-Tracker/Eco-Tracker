var router = require("express").Router();

const {
    register,
    getOneByTitle,
    getAll,
    deleteOneByTitle,
    updateOneByTitle
}= require("../controller/post")
router.get("/", getAll);
router.post("/register", register);
router.get("/:title", getOneByTitle);
router.delete("/:title", deleteOneByTitle);
router.put("/:post_Id", updateOneByTitle);




module.exports = router;     