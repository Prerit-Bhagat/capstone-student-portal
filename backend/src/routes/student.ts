import express from "express";
import { getStudent } from "@/controllers/student.js";

const router = express.Router();

router.get("/get-student", getStudent);

export { router as studentRouter };
