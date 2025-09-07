import { Response } from "express";
import jwt from "jsonwebtoken";
import { cookieOptions } from "@/constants/cookie-options.js";

const generateToken = (res: Response, studentId: string) => {
  const token = jwt.sign({ studentId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "15d",
  });

  res.cookie("token", token, cookieOptions);
};

export { generateToken };
