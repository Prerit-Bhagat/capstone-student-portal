import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { checkAuth, login, logout, getLoggedInStudent } from "@/controllers/auth.js";

const router = express.Router();

router.get("/check", checkAuth);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-student", isLoggedIn, getLoggedInStudent);

export { router as authRouter };
