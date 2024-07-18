const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const middleware = require("../middleware/middleware");
router.get("/:id", middleware.requireAuth, userController.user_edit_get);

router.put("/:id", middleware.requireAuth, userController.user_put);

module.exports = router;
