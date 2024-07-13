const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const myDataSchema = new Schema({
  userName: String,
});
const MyData = mongoose.model("MyData", myDataSchema);
module.exports = MyData;
