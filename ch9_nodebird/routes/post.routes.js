import express from "express";
import { isLoggedIn } from "../middlewares/auth";
import { imgUpload, upload } from "../middlewares/multer";
import { afterUploadImage, uploadPost } from "../controllers/post.controller";

const router = express.Router();

router.post("/img", isLoggedIn, imgUpload.single("img"), afterUploadImage);
router.post("/", isLoggedIn, upload.none(), uploadPost);

export default router;
