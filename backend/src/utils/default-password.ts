import { IStudent } from "@/types/types.js";

const extractName = (name: string): string => {
  return name.replace(/\s+/g, "");
};

const extractDOB = (dob: Date): string => {
  return dob.toISOString().split("T")[0].split("-").reverse().join("");
};

const getDefaultPassword = (student: IStudent): string => {
  const defaultPassword = extractName(student.name) + "@" + extractDOB(student.dob);
  return defaultPassword;
};

export { getDefaultPassword };
