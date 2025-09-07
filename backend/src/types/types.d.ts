type Gender = "MALE" | "FEMALE" | "OTHER";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type BloodGroup = "A_POS" | "A_NEG" | "B_POS" | "B_NEG" | "AB_POS" | "AB_NEG" | "O_POS" | "O_NEG";

interface IStudent {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  isPasswordDefault: boolean;
  phone: string;
  gender: Gender;
  dob: Date;
  department: string;
  hostel?: string | null;
  roomNumber?: string | null;
  yearOfStudy: number;
  emergencyContact?: string | null;
  bloodGroup: BloodGroup;
  createdAt: Date;
  updatedAt: Date;

  appointments?: Appointment[];
}

interface IDoctor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialization?: string;
  roomNumber?: string;
  designation?: string;
  createdAt: Date;
  updatedAt: Date;

  availability?: Availability[];
  appointments?: Appointment[];
}

interface IAppointment {
  id: string;
  studentId: string;
  doctorId: string;
  appointmentDate: Date;
  reason?: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  student?: Student;
  doctor?: Doctor;
}

interface IAvailability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;

  doctor?: Doctor;
}
