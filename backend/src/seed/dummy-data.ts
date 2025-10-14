import { DoctorModel } from "@/models/doctor.js";
import { StudentModel } from "@/models/student.js";

const addDummyStudent = async () => {
  const student = await StudentModel.create({
    rollNumber: "102203331",
    name: "Raghav Bhagat",
    email: "rbhagat_be22@thapar.edu",
    password: "RaghavBhagat@06042004",
    phone: "7087394178",
    gender: "MALE",
    dob: new Date("2004-04-06"),
    department: "COE",
    hostel: "M",
    roomNumber: "C-204",
    yearOfStudy: 4,
    emergencyContact: "7087394178",
    bloodGroup: "O_POS",
  });

  console.log("Dummy student added:", student);
};

const addDummyDoctor = async () => {
  const doctor = await DoctorModel.create({
    name: "Dr. Zulfikar Qureshi",
    email: "zulfikar.qureshi@thapar.edu",
    phone: "9876543210",
    gender: "MALE",
    specialization: "General Physician",
    designation: "Senior Medical Officer",
  });

  console.log("Dummy doctor added:", doctor);
};

export { addDummyStudent, addDummyDoctor };
