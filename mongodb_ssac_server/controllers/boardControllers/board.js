const board = require("../../models/board");
const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");

const boardController = {
  // 게시물 저장
  saveBoard: async (req, res) => {
    const userInfo = req.userInfo; // 로그인 인가/권한 부여

    const { title, content, boardPw } = req.body;

    const boardModel = new board({
      title,
      content,
      boardPw,
      writeTime: new Date(),
      writer: userInfo._id,
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
      const result = await board.find().populate("writer", "name userId"); // 치환하고 싶은 내용을 populate()안에
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
    const userInfo = req.userInfo;
    const { id } = req.params; // 게시물의 _id

    // 일치하는 회원인지 아닌지 확인

    const ownResult = await board.checkAuth({
      boardId: id,
      writerId: userInfo._id,
    }); // models/board 에서 호출
    if (ownResult === -1) {
      return res.status(409).json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }

    // try {
    //   const ownResult = await board.findOne({ _id: id }); // 게시물의 _id
    //   const ownId = ownResult.writer; // 작성자의 id
    //   if (ownId.toString() !== userInfo._id.toString())
    //     // 비교하고자 하는 user의 _id
    //     return res.status(409).json({ message: "접근 권한이 없습니다." });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({
    //     message: "DB 서버 에러",
    //   });
    // }

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
    const userInfo = req.userInfo;
    const { id } = req.params;
    const { title, content, boardPw } = req.body;

    // 일치하는 회원인지 아닌지 확인

    const ownResult = await board.checkAuth({
      boardId: id,
      writerId: userInfo._id,
    }); // models/board 에서 호출

    if (ownResult === -1) {
      return res.status(409).json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }
    // try {
    //   const ownResult = await board.findOne({ _id: id });
    //   const ownId = ownResult.writer; // 작성자의 id
    //   if (ownId.toString() !== userInfo._id.toString())
    //     return res.status(409).json({ message: "접근 권한이 없습니다." });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({
    //     message: "DB 서버 에러",
    //   });
    // }

    try {
      const result = await board.findByIdAndUpdate(
        id,
        {
          title,
          content,
          boardPw,
          writeTime: new Date(),
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
