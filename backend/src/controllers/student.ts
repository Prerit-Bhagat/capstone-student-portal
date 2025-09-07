import type { Request, Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";

const getStudent = tryCatch(async (_req: Request, res: Response) => {
  const student: Student = {
    id: "696969",
    rollNumber: "1022033356",
    name: "Arshiaaaaahhhhhhh",
    email: "arshiah@pornhub.com",
    phone: "9876543210",
    gender: "FEMALE",
    dob: new Date("09-09-2001"),
    department: "COE",
    hostel: "F",
    roomNumber: "C-69",
    yearOfStudy: 4,
    emergencyContact: "",
    bloodGroup: "F+",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  if (!student) throw new ErrorHandler(404, "Student not found !");

  return res.status(200).json(student);
});

export { getStudent };
