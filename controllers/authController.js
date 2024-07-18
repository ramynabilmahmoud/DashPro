const AuthUser = require("../models/authUserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const user_signout_get = (req, res) => {
  const token = req.cookies.token;
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const user_signup_post = async (req, res) => {
  try {
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({ validationErrorArray: objError.errors });
    }
    const checkEmailExists = await AuthUser.findOne({ email: req.body.email });
    if (checkEmailExists) {
      return res.json({ emailExists: "This email is already exists" });
    } else {
      const newUser = await AuthUser.create(req.body);
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: newUser._id });
    }
  } catch (error) {
    console.log(error);
  }
};

const user_login_post = async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    if (loginUser == null) {
      res.json({ notFoundEmail: "This email is not exists" });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        const token = jwt.sign(
          { id: loginUser._id },
          process.env.JWT_SECRET_KEY
        );
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: loginUser._id });
      } else {
        res.json({ passwordError: "Password is invalid" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const user_welcome_get = (req, res) => {
  res.render("welcome");
};

const user_login_get = (req, res) => {
  res.render("./auth/login");
};

const user_signup_get = (req, res) => {
  res.render("./auth/signup");
};

module.exports = {
  user_signout_get,
  user_signup_post,
  user_login_post,
  user_welcome_get,
  user_login_get,
  user_signup_get,
};
