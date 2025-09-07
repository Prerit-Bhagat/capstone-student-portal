import { type Request, type Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { prisma } from "@/config/prisma.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";

const getAllStudents = tryCatch(async (_req: Request, res: Response) => {
  const students = await prisma.student.findMany({});

  if (!students || students.length === 0) throw new ErrorHandler(204, "No students found !");
  return res.status(200).json(students);
});

export { getAllStudents };
