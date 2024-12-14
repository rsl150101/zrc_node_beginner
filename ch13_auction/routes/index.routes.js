const express = require("express");
const { imgUpload } = require("../middlewares/multer");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares/auth");
const {
  renderMain,
  renderJoin,
  renderGood,
  createGood,
  renderAuction,
  bid,
} = require("../controllers/index.controller");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", renderMain);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/good", isLoggedIn, renderGood);
router.post("/good", isLoggedIn, imgUpload.single("img"), createGood);
router.get("/good/:id", isLoggedIn, renderAuction);
router.post("/good/:id/bid", isLoggedIn, bid);

module.exports = router;
