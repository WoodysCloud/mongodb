const express = require("express");
const authController = require("../../controllers/authControllers/auth");
const authModule = require("../../modules/authModule");
const router = express.Router();
const boardRouter = require("./board/index");
const searchRouter = require("./search/index");

// 회원가입
router.post("/signup", authController.singup);

// 로그인
router.post("/signin", authController.signin);

// 회원 정보 받아오기
router.get("/profile", authModule.loggedIn, authController.getProfile);

// 게시물 관련 모듈 불러오기
router.use("/board", boardRouter);

router.use("/search", searchRouter);
module.exports = router;
