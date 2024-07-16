const express = require("express");
const router = express.Router();
const userSchema = require("../models/customerSchema");
const moment = require("moment");

// GET Request
router.get("/", (req, res) => {
  userSchema
    .find()
    .then((result) => {
      res.render("index", { user: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/view/:id", (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { userDetails: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search", (req, res) => {
  const searchText = req.body.searchText.trim().toLowerCase();
  userSchema
    .find({
      $or: [{ firstName: searchText }, { lastName: searchText }],
    })
    .then((result) => {
      res.render("user/search", { user: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  userSchema
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
