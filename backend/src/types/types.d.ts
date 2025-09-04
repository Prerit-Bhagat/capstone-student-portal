type Gender = "MALE" | "FEMALE" | "OTHER";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone?: string;
  gender: Gender;
  dob?: Date;
  department?: string;
  hostel?: string;
  roomNumber?: string;
  yearOfStudy?: number;
  emergencyContact?: string;
  bloodGroup?: string;
  createdAt: Date;
  updatedAt: Date;

  appointments?: Appointment[];
}

interface Doctor {
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

interface Appointment {
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

interface Availability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;

  doctor?: Doctor;
}
