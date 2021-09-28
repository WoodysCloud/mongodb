const board = require("../../models/board");

const boardController = {
  // 게시물 저장
  saveBoard: async (req, res) => {
    const { title, content, boardPw, writer } = req.body;

    const boardModel = new board({
      title,
      content,
      boardPw,
      writeTime: new Date(),
      writer,
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

  // findByIdAndUpdate를 이용한 수정
  // const updateResult = await board.findByIdAndUpdate(id, {title, content});

  // save를 이용한 수정
  // const result = await board.findById(_id);
  // result.title = title;
  // result.content = content;
  // await result save();

  // 게시물 수정
  updateBoard: async (req, res) => {
    const { id } = req.params;
    const { title, content, boardPw, writer } = req.body;

    try {
      const result = await board.findByIdAndUpdate(
        id,
        {
          title,
          content,
          boardPw,
          writeTime: new Date(),
          writer,
        },
        { new: true } // 업데이트 하고 난 후의 결과값 반환
      );
      res.status(200).json({
        message: "게시물 수정 완료",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },
};

module.exports = boardController;
