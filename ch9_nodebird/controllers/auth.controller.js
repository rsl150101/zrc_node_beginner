import bcrypt from "bcrypt";
import User from "../models/user";
import passport from "passport";

export const join = async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hashPw = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hashPw,
    });
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};
export const login = () => {};
export const logout = () => {};
