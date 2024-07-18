const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const routes = require("./routes/allRoutes");
const addUserRoute = require("./routes/addUser");
const editUserRoute = require("./routes/editUser");
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.json());
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);
app.use("/user/add.html", addUserRoute);
app.use("/edit", editUserRoute);
