import React, { createContext } from "react";

export interface StudentInterface {
  _id: string;
  name: string;
  email: string;
  gender: string;
  mobile_no: string;
  dob?: Date;
  addr?: string;
  role?: string;
  roll_no: string;
  hostel?: string;
  year?: string;
  room_no?: string;
  department?: string;
}

export const StudentContext = createContext<{
  student: StudentInterface;
  dispatch: React.Dispatch<React.SetStateAction<StudentInterface>>;
}>({
  student: {
    _id: "",
    name: "",
    email: "",
    gender: "",
    mobile_no: "",
    dob: new Date(),
    addr: "",
    roll_no: "",
    role: "student",
    hostel: "",
    year: "",
    room_no: "",
    department: "",
  },
  dispatch: () => {},
});
