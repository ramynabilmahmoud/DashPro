const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const userSchema = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
const moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// GET Requst
app.get("/", (req, res) => {
  userSchema
    .find()
    .then((result) => {
      res.render("index", { user: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { userDetails: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/view/:id", (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { userDetails: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST Requst
app.post("/user/add.html", (req, res) => {
  const user = new userSchema(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE Request
app.delete("/delete/:id", (req, res) => {
  userSchema
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose
  .connect(
    "mongodb+srv://ramynabilmahmoud:8UqIs8er3PQkbbTF@cluster0.afaajs1.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
