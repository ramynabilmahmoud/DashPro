const express = require("express");
const router = express.Router();
const userSchema = require("../models/customerSchema");
const userController = require("../controllers/usersController");

router.get("/", userController.user_add_get);

router.post("/", userController.user_post);

module.exports = router;
