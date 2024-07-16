const express = require("express");
const router = express.Router();
const userSchema = require("../models/customerSchema");
const moment = require("moment");
const userController = require("../controllers/usersController");
// GET Request
router.get("/", userController.user_index_get);

router.get("/view/:id", userController.user_view_get);

router.post("/search", userController.user_search_post);

router.delete("/delete/:id", userController.user_delete);

module.exports = router;
