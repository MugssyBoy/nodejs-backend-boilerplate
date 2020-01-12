const router = require("express").Router();
const { homePage } = require("../handlers");

router.get("/", homePage);

module.exports = router;
