import app from "../app";
import request from "supertest";
import db from "../models";

const { sequelize } = db;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("POST /join", () => {
  test("if not logged in, join", (done) => {
    request(app)
      .post("/auth/join")
      .send({ email: "test@naver.com", password: "test", nickname: "test" })
      .expect("Location", "/")
      .expect(302, done);
  });

  test("if user exist, redirect /join?error=exist", (done) => {
    request(app)
      .post("/auth/join")
      .send({ email: "test@naver.com", password: "test", nickname: "test" })
      .expect("Location", "/join?error=exist")
      .expect(302, done);
  });
});

describe("POST /join", () => {
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/auth/login")
      .send({
        email: "test@naver.com",
        password: "test",
      })
      .end(done);
  });

  test("if logged in, redirect /?error=You are already logged in", (done) => {
    const message = encodeURIComponent("You are already logged in");
    agent
      .post("/auth/join")
      .send({ email: "test@naver.com", password: "test", nickname: "test" })
      .expect("Location", `/?error=${message}`)
      .expect(302, done);
  });
});

describe("POST /login", () => {
  test("login", (done) => {
    request(app)
      .post("/auth/login")
      .send({ email: "test@naver.com", password: "test" })
      .expect("Location", "/")
      .expect(302, done);
  });

  test("not found user", (done) => {
    const message = encodeURIComponent("No user found");
    request(app)
      .post("/auth/login")
      .send({ email: "test1@naver.com", password: "test" })
      .expect("Location", `/?loginError=${message}`)
      .expect(302, done);
  });

  test("incorrect password", (done) => {
    const message = encodeURIComponent("Incorrect password");
    request(app)
      .post("/auth/login")
      .send({ email: "test@naver.com", password: "tt" })
      .expect("Location", `/?loginError=${message}`)
      .expect(302, done);
  });
});

describe("GET /logout", () => {
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/auth/login")
      .send({
        email: "test@naver.com",
        password: "test",
      })
      .end(done);
  });

  test("if not logged in, 403 error", (done) => {
    request(app)
      .get("/auth/logout")
      .expect(403)
      .end((_, res) => {
        expect(res.text).toEqual("Require login");
        done();
      });
  });
  test("logout", (done) => {
    agent.get("/auth/logout").expect("Location", "/").expect(302, done);
  });
});
