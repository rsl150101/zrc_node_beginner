import express from "express";
import {
  getMyPosts,
  searchByHashtag,
  test,
} from "../controllers/index.controller";

const router = express.Router();

router.get("/test", test);
router.get("/myposts", getMyPosts);
router.get("/search/:hashtag", searchByHashtag);

export default router;
