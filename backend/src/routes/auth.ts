import express from "express";
import { checkAuth, login } from "@/controllers/auth.js";

const router = express.Router();

router.get("/check", checkAuth);
router.post("/login", login);

export { router as authRouter };
