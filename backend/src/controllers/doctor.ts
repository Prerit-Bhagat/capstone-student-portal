import type { Request, Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import { AppointmentModel } from "@/models/appointment.js";
import { validateId } from "@/utils/validate-id.js";

const getDoctorAppointments = tryCatch(async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  if (!doctorId || !validateId(doctorId)) throw new ErrorHandler(400, "Invalid doctor ID !");

  const appointments = await AppointmentModel.find({ doctorId })
    .populate("studentId", "name rollNumber email phone")
    .sort({ appointmentDate: -1 });

  return res.status(200).json(appointments);
});

export { getDoctorAppointments };
