import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { checkAuth, login, updatePassword, getLoggedInUser } from "@/controllers/auth.js";

const router = express.Router();

router.get("/check", checkAuth);
router.post("/login", login);
router.get("/get-user", isLoggedIn, getLoggedInUser);
router.post("/update-password", isLoggedIn, updatePassword);

export { router as authRouter };
