import express from "express";
import { isLoggedIn } from "@/middlewares/auth.js";
import {
  setAvailability,
  getDoctorAvailability,
  deleteAvailability,
} from "@/controllers/availability.js";

const router = express.Router();

router.post("/set-availability", isLoggedIn, setAvailability);
router.get("/get-availability/:doctorId", isLoggedIn, getDoctorAvailability);
router.delete("/delete-availability/:availabilityId", isLoggedIn, deleteAvailability);

export { router as availabilityRouter };
