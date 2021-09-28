const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");

const authController = {
  // 회원가입
  singup: async (req, res) => {
    const { userId, name, password } = req.body;

    try {
      const result = await user.findOne({ userId }); // ID check

      if (!result) {
        // 중복된 ID가 없을 경우
        const userModel = new user({ userId, name, password });
        await userModel.save();
        res.status(200).json({
          message: "회원가입 성공",
        });
      } else {
        // 있을 경우
        res.status(409).json({
          message: "중복된 아이디가 존재합니다.",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },

  // 로그인
  signin: async (req, res) => {
    const { userId, password } = req.body;

    try {
      const result = await user.findOne({ userId, password }); // 동일한 userId가 있는가?
      if (result) {
        // 사용자 확인을 마친 후(로그인 성공 후)에 토큰 발급
        // payload에 userId값을 받아 옴 -> 보통 민감하지 않은, 식별 가능한 정보들을 받아옴
        const payload = {
          userId: result.userId,
          name: result.name,
        };

        const token = jwtModule.create(payload);
        // console.log(token);

        res.status(200).json({
          message: "로그인 성공",
          accessToken: token,
        });
      } else {
        res.status(400).json({
          message: "로그인 실패",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
};

module.exports = authController;
