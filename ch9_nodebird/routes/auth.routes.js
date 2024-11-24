import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/auth";
import { join, login, logout } from "../controllers/auth.controller";

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

export default router;
