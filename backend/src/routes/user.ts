import express from "express";
import { getStudent } from "@/controllers/user.js";

const router = express.Router();

router.get("/get-student", getStudent);

export { router as userRouter };
