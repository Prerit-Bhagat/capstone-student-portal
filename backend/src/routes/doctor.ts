import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { getAllDoctors, getDoctorAppointments } from "@/controllers/doctor.js";

const router = express.Router();

router.get("/get-all-doctors", isLoggedIn, getAllDoctors);
router.get("/get-appointments/:doctorId", isLoggedIn, getDoctorAppointments);

export { router as doctorRouter };
