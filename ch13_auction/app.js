const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const nunjucks = require("nunjucks");
require("dotenv").config();
const { sequelize } = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");

passportConfig();

//- router
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth.routes");

const app = express();

app.set("port", process.env.PORT || 8010);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connect DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);

//- Handle 404
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} Not found router`);
  error.status = 404;
  next(error);
});

//- Handle Error
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
