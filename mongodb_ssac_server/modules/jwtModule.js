const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtSecret.json"); // secret key는 config폴더에서 따로 관리

const jwtModule = {
  create: (payload) => {
    // jwt 생성

    const option = {
      algorithm: "HS256",
      expiresIn: "30d",
      issuer: "ssac",
    };
    const token = jwt.sign(payload, jwtSecret.secretKey, option); // payload는 object형태

    return token;
  },
  verify: (token) => {
    // jwt 확인
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret.secretKey);
    } catch (error) {
      console.log(error);
      if (error.message === "jwt expired") {
        console.log("expired token");
      } else if (error.message === "invalid token") {
        console.log("invalid token");
        return -2;
      } else {
        console.log("error token");
        return -3;
      }
    }
    return decoded;
  },
};

module.exports = jwtModule;
