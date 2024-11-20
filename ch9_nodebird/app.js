import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
dotenv.config();

import pageRouter from "./routes/page.routes";

const app = express();

app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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

app.use("/", pageRouter);

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

app.listen(app.get("port"), () => {
  console.log(`Listening on http://localhost:${app.get("port")}`);
});
