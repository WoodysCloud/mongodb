var express = require("express");
var router = express.Router();

const users = require("../models/user");

// Create
router.post("/auth", (req, res) => {
  const { name, age, gender, likes } = req.body;

  const userModel = new users({
    // userModel.name = name;
    // userModel.age = age;
    // userModel.gender = gender;
    // userModel.likes = likes;
    name,
    age,
    gender,
    likes,
  });

  userModel
    .save()
    .then((savedUser) => {
      console.log(savedUser);
      res.status(200).json({
        message: "생성 성공",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }); // 비동기 방식 (promise)
});

// Read All
router.get("/auth", async (req, res) => {
  try {
    const result = await users.find(); // = (sql) select *
    res.status(200).json({
      message: "조회 성공",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "조회 실패",
      error: error,
    });
  }
});

// Read Detail
router.get("/auth/:id", async (req, res) => {
  const { id } = req.params; // id = object key

  try {
    const result = await users.findOne({ _id: id }); // (NoSQL) findOne = (SQL) select where
    res.status(200).json({
      message: "조회 성공",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "조회 실패",
    });
  }
});

// Update
router.put("/auth/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, likes } = req.body;
  try {
    const result = await users.findByIdAndUpdate(
      id,
      {
        name,
        age,
        gender,
        likes,
      },
      { new: true } // 수정된 데이터를 반환(수정된 데이터로 저장). false하면 수정된 데이터 사라지고 원래 있던 데이터로 저장
    );
    res.status(200).json({
      message: "수정 완료",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "수정 실패",
    });
  }
});

// Delete
router.delete("/auth/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await users.findOneAndDelete(id);
    res.status(200).json({
      message: "삭제 성공",
    });
  } catch (error) {
    res.status(500).json({
      message: "삭제 실패",
      error: error,
    });
  }
});

module.exports = router;
