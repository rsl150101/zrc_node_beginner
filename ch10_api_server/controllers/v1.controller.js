import Domain from "../models/domain";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const createToken = async (req, res, next) => {
  try {
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
