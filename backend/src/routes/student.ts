import express from "express";
import { getAllStudents } from "@/controllers/student.js";

const router = express.Router();

router.get("/all", getAllStudents);

export { router as studentRouter };
