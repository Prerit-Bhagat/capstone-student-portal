import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import { getDoctorAppointments } from "@/controllers/doctor.js";

const router = express.Router();

router.get("/get-appointments/:doctorId", isLoggedIn, getDoctorAppointments);

export { router as doctorRouter };
