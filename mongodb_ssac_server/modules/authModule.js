const user = require("../models/user");
const jwtModule = require("./jwtModule");

const authModule = {
  loggedIn: async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(409).json({
        // 409: 회원 인증 관련 에러 코드
        message: "토큰 없음",
      });
    }

    const decoded = jwtModule.verify(token);
    if (decoded === -1) {
      return res.status(409).json({
        message: "만료된 토큰입니다.",
      });
    } else if (decoded === -2) {
      return res.status(409).json({
        message: "유효하지 않은 토큰입니다.",
      });
    } else if (decoded === -3) {
      return res.status(409).json({
        message: "토큰 에러입니다.",
      });
    }

    let userInfo;
    try {
      userInfo = await user.findOne({ userId: decoded.userId });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "유효하지 않은 유저입니다.",
      });
    }

    req.userInfo = userInfo; // userInfo 담아주고
    next(); // 다음 미들웨어(생성, 수정, 삭제) 호출
  },
};

module.exports = authModule;
