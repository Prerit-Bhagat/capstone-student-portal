import { type Request, type Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { StudentModel } from "@/models/student.js";

const getAllStudents = tryCatch(async (_: Request, res: Response) => {
  const students = await StudentModel.find();
  return res.status(200).json(students);
});

export { getAllStudents };
