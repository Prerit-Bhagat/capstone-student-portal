import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { updatePassword } from "@/controllers/student.js";

const router = express.Router();

router.post("/update-password", isLoggedIn, updatePassword);

export { router as studentRouter };
