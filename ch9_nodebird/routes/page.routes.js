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
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

export default router;
