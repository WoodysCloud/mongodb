const board = require("../../models/board");

const boardController = {
  // 전체 게시물 조회
  readAllBoard: async (req, res) => {
    try {
      const result = await board.find();
      if (!result) return res.status(400).json({ message: "데이터 부재" });

      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },

  // 특정 게시물 조회
  readCertainBoard: async (req, res) => {
    const { id } = req.params; // id = object key

    try {
      const result = await board.findById(id);
      if (!result) return res.status(400).json({ message: "데이터 부재" });
      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },

  // 게시물 저장
  saveBoard: async (req, res) => {
    const { title, content, boardPw } = req.body;
    const boardModel = new board({
      title,
      content,
      boardPw,
      writeTime: new Date(),
    });

    try {
      const result = await boardModel.save();
      res.status(200).json({
        message: "게시물 저장 성공",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },

  // 게시물 삭제
  deleteBoard: async (req, res) => {
    const { id } = req.params;
    try {
      await board.findOneAndDelete(id);
      res.status(200).json({
        message: "삭제 성공",
      });
    } catch (error) {
      res.status(500).json({
        message: "삭제 실패",
        error: error,
      });
    }
  },
};

module.exports = boardController;
