import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import User from "../models/user";

const kakaoStrategy = () => {
  passport.use(
    new KakaoStrategy(
      { clientID: process.env.KAKAO_ID, callbackURL: "/auth/kakao/callback" },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

export default kakaoStrategy;
