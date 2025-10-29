import { Document, Types } from "mongoose";

export enum IGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum IAppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum IBloodGroup {
  A_POS = "A_POS",
  A_NEG = "A_NEG",
  B_POS = "B_POS",
  B_NEG = "B_NEG",
  AB_POS = "AB_POS",
  AB_NEG = "AB_NEG",
  O_POS = "O_POS",
  O_NEG = "O_NEG",
}

export interface IStudent extends Document {
  _id: Types.ObjectId;
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  isPasswordDefault: boolean;
  phone: string;
  gender: IGender;
  dob: Date;
  department: string;
  hostel?: string;
  roomNumber?: string;
  yearOfStudy: number;
  emergencyContact?: string;
  bloodGroup: IBloodGroup;
  appointments: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IDoctor extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  gender: IGender;
  specialization?: string;
  designation?: string;
  availability: Types.ObjectId[];
  appointments: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IAppointment extends Document {
  _id: Types.ObjectId;
  studentId: Types.ObjectId | IStudent;
  doctorId: Types.ObjectId | IDoctor;
  appointmentDate: Date;
  reason?: string;
  status: IAppointmentStatus;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAvailability extends Document {
  _id: Types.ObjectId;
  doctorId: Types.ObjectId | IDoctor;
  startTime: Date;
  endTime: Date;
}
