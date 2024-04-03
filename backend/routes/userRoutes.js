const router = require("express").Router();
const { getUser, updateUser } = require("../controller/userController");
const  verifyToken  = require("../middleware/auth");

router.post("/getuser", verifyToken, getUser);
router.put("/updateUser", verifyToken, updateUser);

module.exports = router;
