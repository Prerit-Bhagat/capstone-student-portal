import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { checkAuth, login, updatePassword, getLoggedInStudent } from "@/controllers/auth.js";

const router = express.Router();

router.get("/check", checkAuth);
router.post("/login", login);
router.get("/get-student", isLoggedIn, getLoggedInStudent);
router.post("/update-password", isLoggedIn, updatePassword);

export { router as authRouter };
