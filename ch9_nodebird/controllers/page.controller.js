import Hashtag from "../models/hashtag";
import Post from "../models/post";
import User from "../models/user";

export const renderProfile = (req, res, next) => {
  res.render("profile", { title: "My profile" });
};

export const renderJoin = (req, res, next) => {
  res.render("join", { title: "Join" });
};

export const renderMain = async (req, res, next) => {
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

export const renderHashtag = async (req, res, next) => {
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
