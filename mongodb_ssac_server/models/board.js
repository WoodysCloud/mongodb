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

boardSchema.statics.checkAuth = async function (params) {
  const { boardId, writerId } = params;
  try {
    const ownResult = await this.findOne({ _id: boardId }); // 게시물의 _id, this는 board schema(model)를 가리킴
    const ownId = ownResult.writer; // 작성자의 id
    if (ownId.toString() !== writerId.toString()) {
      return -1;
    }
    return 1;
    // 비교하고자 하는 user의 _id
    // res.status(409).json({ message: "접근 권한이 없습니다." });
  } catch (error) {
    return -2;
    // res.status(500).json({
    //   message: "DB 서버 에러",
    // });
  }
};

boardSchema.methods.checkMe = function () {
  this.title; // 여기서 this는 document(data instance)를 가리킴
};

module.exports = mongoose.model("board", boardSchema);
