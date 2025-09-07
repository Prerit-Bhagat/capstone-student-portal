import { type Request, type Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { prisma } from "@/config/prisma.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import { generateToken } from "@/utils/generate-token.js";

const checkAuth = (req: Request, res: Response) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ isLoggedIn: false });
  if (token) return res.status(200).json({ isLoggedIn: true });
};

const login = tryCatch(async (req: Request, res: Response) => {
  const rollNumber: string = req.body.rollNumber;
  const password: string = req.body.password;

  if (!rollNumber || !password) {
    throw new ErrorHandler(400, "All fields are required !");
  }

  const student = await prisma.student.findUnique({ where: { rollNumber } });
  if (!student) {
    throw new ErrorHandler(401, "Invalid Credentials !");
  }

  const matchPassword = student.password === password;
  if (!matchPassword) {
    throw new ErrorHandler(401, "Invalid Credentials !");
  }

  generateToken(res, student.id);
  return res.status(200).json({ message: `Welcome ${student.name} !` });
});

const updatePassword = tryCatch(async (_req: Request, _res: Response) => {});

export { checkAuth, login, updatePassword };
