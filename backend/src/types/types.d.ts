import { Document, Types } from "mongoose";

type Gender = "MALE" | "FEMALE" | "OTHER";
type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
type BloodGroup = "A_POS" | "A_NEG" | "B_POS" | "B_NEG" | "AB_POS" | "AB_NEG" | "O_POS" | "O_NEG";

interface IStudent extends Document {
  _id: Types.ObjectId;
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  isPasswordDefault: boolean;
  phone: string;
  gender: Gender;
  dob: Date;
  department: string;
  hostel?: string;
  roomNumber?: string;
  yearOfStudy: number;
  emergencyContact?: string;
  bloodGroup: BloodGroup;
  appointments: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

interface IDoctor extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  specialization?: string;
  designation?: string;
  availability: Types.ObjectId[];
  appointments: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

interface IAppointment extends Document {
  _id: Types.ObjectId;
  studentId: Types.ObjectId | IStudent;
  doctorId: Types.ObjectId | IDoctor;
  appointmentDate: Date;
  reason?: string;
  status: AppointmentStatus;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

interface IAvailability extends Document {
  _id: Types.ObjectId;
  doctorId: Types.ObjectId | IDoctor;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}
