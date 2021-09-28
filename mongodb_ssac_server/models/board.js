const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  writeTime: { type: Date, default: new Date(), required: true },
  boardPw: { type: String, required: true },
  // Connecting Collections
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // ObjectId = _id
});

module.exports = mongoose.model("board", boardSchema);
