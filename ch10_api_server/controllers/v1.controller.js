import jwt from "jsonwebtoken";
import Domain from "../models/domain";
import User from "../models/user";
import Post from "../models/post";
import Hashtag from "../models/hashtag";

export const createToken = async (req, res, next) => {
  try {
    const { clientSecret } = req.body;

    const domain = await Domain.findOne({
      where: { clientSecret },
      include: [{ model: User, attributes: ["id", "nickname"] }],
    });

    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "Domain not found. Register your domain",
      });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nickname: domain.User.nickname,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
        issuer: "nodebird",
      }
    );
    return res.json({
      code: 200,
      message: "",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Server error",
    });
  }
};

export const tokenTest = (req, res, next) => {
  res.json(res.locals.decoded);
};

export const getMyPosts = (req, res) => {
  Post.findAll({ where: { userId: res.locals.decoded.id } })
    .then((posts) => {
      res.json({ code: 200, payload: posts });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "Server error",
      });
    });
};

export const getPostsByHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: "No search result",
      });
    }
    const posts = await hashtag.getPosts();
    if (posts.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No posts",
      });
    }
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Server error",
    });
  }
};
