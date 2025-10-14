import { type Request } from "express";

interface RequestWithStudent extends Request {
  studentId?: string;
}
