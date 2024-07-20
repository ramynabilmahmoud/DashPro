const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const authUserSchema = new Schema(
  {
    userName: String,
    email: String,
    password: String,
    customersInfo: [
      {
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        age: Number,
        country: String,
        gender: String,
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a model based on that schema
const AuthUser = mongoose.model("User", authUserSchema);

// export the model
module.exports = AuthUser;
