import { isLoggedIn, isNotLoggedIn } from "./auth";

describe("isLoggedIn", () => {
  const res = {
    status: jest.fn(() => res), //* 체이닝 메서드로 이어지는 send 호출을 체이닝 할 수 있게 해야 한다.
    send: jest.fn(),
  };
  const next = jest.fn();

  test("If logged in, isLoggedIn call next", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("If not logged in, isLoggedIn return error", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith("Require login");
  });
});

describe("isNotLoggedIn", () => {
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn();

  test("If not logged in, isNotLoggedIn call next", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("If logged in, isNotLoggedIn redirect you to / with error message", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    const message = "You are already logged in";

    isNotLoggedIn(req, res, next);
    expect(res.redirect).toBeCalledWith(`/?error=${message}`);
  });
});
