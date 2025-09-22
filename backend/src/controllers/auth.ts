import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { tryCatch } from "@/utils/try-catch.js";
import { StudentModel } from "@/models/student.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import { generateToken } from "@/utils/generate-token.js";
import { getDefaultPassword } from "@/utils/default-password.js";
import { type RequestWithStudent } from "@/types/request.js";
import { type IStudent } from "@/types/types.js";

const checkAuth = (req: Request, res: Response) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ isLoggedIn: false });
  if (token) return res.status(200).json({ isLoggedIn: true });
};

const login = tryCatch(async (req: Request, res: Response) => {
  console.log(req.body);
  const rollNumber: string = req.body.rollNumber;
  const password: string = req.body.password;

  if (!rollNumber || !password) throw new ErrorHandler(400, "All fields are required !");

  const student: IStudent = await StudentModel.findOne({ rollNumber }).select("+password");
  if (!student) throw new ErrorHandler(401, "Invalid credentials !");

  let matchPassword = false;
  if (student.isPasswordDefault) matchPassword = password === getDefaultPassword(student);
  else matchPassword = await bcrypt.compare(password, student.password);

  if (!matchPassword) throw new ErrorHandler(401, "Invalid credentials !");

  generateToken(res, student.id);
  return res.status(200).json({ message: `Welcome ${student.name} !` });
});

// Get currently logged-in student
const getUser = tryCatch(async (req: RequestWithStudent, res: Response) => {
  const studentId = req.studentId;
  if (!studentId) throw new ErrorHandler(401, "Unauthorized!");

  const student: IStudent | null = await StudentModel.findById(studentId).select("+password");
  if (!student) throw new ErrorHandler(404, "Student not found!");

  return res.status(200).json(student);
});

const updatePassword = tryCatch(async (req: RequestWithStudent, res: Response) => {
  const oldPassword: string = req.body.oldPassword;
  if (!oldPassword) throw new ErrorHandler(400, "Current password is required !");
  const newPassword: string = req.body.newPassword;
  if (!newPassword) throw new ErrorHandler(400, "New password cannot be empty !");
  if (oldPassword === newPassword)
    throw new ErrorHandler(400, "Current and New password cannot be same !");

  const studentId = req.studentId;
  if (!studentId) throw new ErrorHandler(401, "Unauthorized !");
  const student: IStudent = await StudentModel.findById(studentId).select("+password");
  if (!student) throw new ErrorHandler(404, "Student not found !");

  let matchOldPassword = false;
  if (student.isPasswordDefault) matchOldPassword = oldPassword === getDefaultPassword(student);
  else matchOldPassword = await bcrypt.compare(oldPassword, student.password);

  if (!matchOldPassword) throw new ErrorHandler(401, "Current password is incorrect !");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await StudentModel.findByIdAndUpdate(studentId, {
    password: hashedPassword,
    isPasswordDefault: false,
  });

  return res.status(200).json({ message: "Password updated successfully !" });
});

export { checkAuth, login, updatePassword, getUser };
