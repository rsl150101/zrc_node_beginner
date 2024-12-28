const Hashtag = require("../models/hashtag");
const Post = require("../models/post");
const User = require("../models/user");

exports.renderProfile = (req, res, next) => {
  res.render("profile", { title: "My profile" });
};

exports.renderJoin = (req, res, next) => {
  res.render("join", { title: "Join" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.render("main", { title: "NodeBird", twits: posts });
  } catch (error) {}
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({
        include: [{ model: User, attributes: ["id", "nickname"] }],
        order: [["createdAt", "DESC"]],
      });
    }
    res.render("main", { title: `${query}|NodeBird`, twits: posts });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
