import express from "express";
import { isLoggedIn } from "../middlewares/auth";
import { follow } from "../controllers/user.controller";
const router = express.Router();

router.post("/:id/follow", isLoggedIn, follow);

export default router;
