import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { getStudentAppointments, updatePassword } from "@/controllers/student.js";

const router = express.Router();

router.post("/update-password", isLoggedIn, updatePassword);
router.get("/get-appointments/:studentId", isLoggedIn, getStudentAppointments);

export { router as studentRouter };
