import express from "express";
import {
  renderJoin,
  renderMain,
  renderProfile,
} from "../controllers/page.controller";

const router = express.Router();

router.use((_, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get("/profile", renderProfile);
router.get("/join", renderJoin);
router.get("/", renderMain);

export default router;
