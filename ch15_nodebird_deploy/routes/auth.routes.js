const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/auth");
const { join, login, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);

router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  isNotLoggedIn,
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/?loginError= Failed kakao login",
  })
);

module.exports = router;
