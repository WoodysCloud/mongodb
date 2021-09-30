var express = require("express");
const searchController = require("../../../controllers/searchController/search");
var router = express.Router();

router.get("/", searchController.search);

module.exports = router;
