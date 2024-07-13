const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Mydata = require("./models/mydataSchema");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  Mydata.find()
    .then((result) => {
      res.render("home", { title: "Home Page", data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index.html", (req, res) => {
  res.send("<h1>Sent To DB </h1>");
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

app.post("/save", (req, res) => {
  console.log(req.body);
  const data = new Mydata(req.body);
  data
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
