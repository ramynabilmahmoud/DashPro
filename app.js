const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userData = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//GET requests
app.get("/", (req, res) => {
  const user = userData
    .find()
    .then((result) => {
      console.log(result);
      res.render("home", { user: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});
app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

//POST requests
app.post("/user/add.html", (req, res) => {
  console.log(req.body);
  const user = new userData(req.body);
  user
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/user/view.html");
});
mongoose
  .connect(
    "mongodb+srv://ramynabilmahmoud:8UqIs8er3PQkbbTF@cluster0.afaajs1.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
