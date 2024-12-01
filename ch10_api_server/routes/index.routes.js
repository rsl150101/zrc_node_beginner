import express from "express";
import { isLoggedIn } from "../middlewares/auth";
import { createDomain, renderLogin } from "../controllers/index.controller";

const router = express.Router();

router.get("/", renderLogin);
router.post("/domain", isLoggedIn, createDomain);

export default router;
