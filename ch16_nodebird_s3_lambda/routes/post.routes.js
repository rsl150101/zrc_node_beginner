const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const { imgUpload, upload } = require("../middlewares/multer");
const {
  afterUploadImage,
  uploadPost,
} = require("../controllers/post.controller");

const router = express.Router();

router.post("/img", isLoggedIn, imgUpload.single("img"), afterUploadImage);
router.post("/", isLoggedIn, upload.none(), uploadPost);

module.exports = router;
