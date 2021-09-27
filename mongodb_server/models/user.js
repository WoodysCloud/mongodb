const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true }, // 타입은 string으로 받고 반드시 필요한 항목 = required:true (Not Null)
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female"], required: true }, // enum으로 들어올 수 있는 값 한정
  likes: [String], // string값들을 배열형태로. ex) ["apple", "banana"]
  createdDate: { type: Date, default: new Date() },
});

module.exports = mongoose.model("user", userSchema);
