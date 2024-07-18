const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// GET Request
router.get("/home", userController.user_index_get);

router.get("/view/:id", userController.user_view_get);

router.post("/search", userController.user_search_post);

router.delete("/delete/:id", userController.user_delete);

module.exports = router;
