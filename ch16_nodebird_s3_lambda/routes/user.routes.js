const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const { follow } = require("../controllers/user.controller");
const router = express.Router();

router.post("/:id/follow", isLoggedIn, follow);

module.exports = router;
