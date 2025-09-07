import jwt from "jsonwebtoken";
import { RequestWithStudent } from "@/types/student.js";
import { type NextFunction, type Response } from "express";
import { prisma } from "@/config/prisma.js";
import { cookieOptions } from "@/constants/cookie-options.js";

interface JwtPayloadTypes {
  studentId: string;
  iat: number;
  exp: number;
}

const isLoggedIn = async (req: RequestWithStudent, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Please login to continue !" });

    const loggedInStudent = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayloadTypes;

    const student = await prisma.student.findUnique({
      where: { id: loggedInStudent.studentId },
    });

    if (!student) {
      return res
        .status(401)
        .cookie("token", "", { ...cookieOptions, expires: new Date(Date.now()) })
        .json({ message: "Session expired. Please login again !" });
    }

    req.studentId = loggedInStudent.studentId;
    next();
  } catch {
    return res
      .status(401)
      .cookie("token", "", { ...cookieOptions, expires: new Date(Date.now()) })
      .json({ message: "Session expired. Please login again !" });
  }
};

export { isLoggedIn };
