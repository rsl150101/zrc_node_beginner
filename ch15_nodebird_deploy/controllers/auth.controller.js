const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

exports.join = async (req, res, next) => {
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

//- local login
exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect("/");
  });
};
