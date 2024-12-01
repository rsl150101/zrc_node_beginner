import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("Require login");
  }
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = "You are already logged in";
    res.redirect(`/?error=${message}`);
  }
};

export const verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "Expired token",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "Invalid token",
    });
  }
};
