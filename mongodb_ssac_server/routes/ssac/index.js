const express = require("express");
const authController = require("../../controllers/authControllers/auth");
const router = express.Router();
const boardRouter = require("./board/index");

// 회원가입
router.post("/signup", authController.singup);

// 로그인
router.post("/signin", authController.signin);

// 게시물 관련 모듈 불러오기
router.use("/board", boardRouter);

module.exports = router;
