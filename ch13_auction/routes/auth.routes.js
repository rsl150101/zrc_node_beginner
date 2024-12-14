const express = require("express");
const { join, login, logout } = require("../controllers/auth.controller");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);

module.exports = router;
