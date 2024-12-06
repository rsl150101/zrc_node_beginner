jest.mock("../models/user");
import User from "../models/user";
import { follow } from "./user.controller";

describe("follow", () => {
  const req = { user: { id: 1 }, params: { id: 2 } };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test("Find users, add them to their following, and respond with success", async () => {
    User.findOne.mockReturnValue({
      addFollowing(id) {
        return Promise.resolve(true);
      },
    });
    await follow(req, res, next);
    expect(res.send).toBeCalledWith("success");
  });

  test("If not find users, follow fn call 404 error with no user message", async () => {
    User.findOne.mockReturnValue(null);
    await follow(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("no user");
  });

  test("If DB error, follow fn call next(error)", async () => {
    const message = "DB Error";
    User.findOne.mockReturnValue(Promise.reject(message));
    await follow(req, res, next);
    expect(next).toBeCalledWith(message);
  });
});
