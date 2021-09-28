const express = require("express");
const router = express.Router();
const boardController = require("../../../controllers/boardControllers/board");

// 전체 게시물 조회
router.get("/", boardController.readAllBoard);

// 특정 게시물 조회
router.get("/:id", boardController.readCertainBoard);

// 게시물 저장
router.post("/", boardController.saveBoard);

// 게시물 삭제
router.delete("/:id", boardController.deleteBoard);

// 게시물 수정
router.put("/:id", boardController.updateBoard);

module.exports = router;
