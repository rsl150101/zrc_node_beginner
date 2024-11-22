import passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import User from "../models/user";

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};

export default passportConfig;
