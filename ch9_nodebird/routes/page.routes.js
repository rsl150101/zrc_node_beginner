import express from "express";
import {
  renderJoin,
  renderMain,
  renderProfile,
} from "../controllers/page.controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/auth";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

export default router;
