const jwt = require("jsonwebtoken");
const AuthUser = require("../models/authUserSchema");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkExistUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.locals.authUser = null;
        next();
      } else {
        const loginUser = await AuthUser.findById(decoded.id);
        res.locals.authUser = loginUser;
        next();
      }
    });
  } else {
    res.locals.authUser = null;
    next();
  }
};
module.exports = { requireAuth, checkExistUser };
