const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const middleware = require("../middleware/middleware");
router.get("/", middleware.requireAuth, userController.user_add_get);

router.post("/", middleware.requireAuth, userController.user_post);

module.exports = router;
