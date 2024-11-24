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
