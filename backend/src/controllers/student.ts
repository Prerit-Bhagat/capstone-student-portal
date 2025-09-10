import { type Request, type Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { StudentModel } from "@/models/student.js";
import { IStudent } from "@/types/types.js";

const getAllStudents = tryCatch(async (_: Request, res: Response) => {
  const students: IStudent[] = await StudentModel.find();
  return res.status(200).json(students);
});

export { getAllStudents };
