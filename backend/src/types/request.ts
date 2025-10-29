import { type Request } from "express";

export interface RequestWithStudent extends Request {
  studentId?: string;
}
