const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/:id", userController.user_edit_get);

router.put("/:id", userController.user_put);

module.exports = router;
