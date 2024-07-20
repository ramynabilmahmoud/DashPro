const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const middleware = require("../middleware/middleware");
const { check } = require("express-validator");

router.get("*", middleware.checkExistUser);
router.post("*", middleware.checkExistUser);

router.get("/", middleware.checkExistUser, authController.user_welcome_get);

router.get("/login", authController.user_login_get);

router.get("/signup", authController.user_signup_get);

router.get("/home", middleware.requireAuth, userController.user_index_get);

router.get("/view/:id", middleware.requireAuth, userController.user_view_get);

router.get("/signout", authController.user_signout_get);

router.post("/search", middleware.requireAuth, userController.user_search_post);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.user_signup_post
);

router.post("/login", authController.user_login_post);

router.delete("/delete/:id", userController.user_delete);

module.exports = router;
