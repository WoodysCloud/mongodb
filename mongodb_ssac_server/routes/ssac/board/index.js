const express = require("express");
const router = express.Router();
const boardController = require("../../../controllers/boardControllers/board");
const authModule = require("../../../modules/authModule");

// 반복 피하기 => 저장,수정,삭제는 컨트롤러 실행 전 로그인 수행해야함 => 미들웨어
// 게시물 저장 (인증 필)
router.post("/", authModule.loggedIn, boardController.saveBoard);

// 전체 게시물 조회
router.get("/", boardController.readAllBoard);

// 특정 게시물 조회
router.get("/:id", boardController.readCertainBoard);

// 게시물 수정 (인증 필)
router.put("/:id", authModule.loggedIn, boardController.updateBoard);

// 게시물 삭제 (인증 필)
router.delete("/:id", authModule.loggedIn, boardController.deleteBoard);

module.exports = router;
