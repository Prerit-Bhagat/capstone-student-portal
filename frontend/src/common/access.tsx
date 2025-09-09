import React, { useContext } from "react";
import { StudentContext } from "../store/userContext";
import { IoIosWarning } from "react-icons/io";

export default function Access({
  text,
  children,
}: {
  text: string[];
  children: React.ReactNode;
}) {
  const { student } = useContext(StudentContext);
  console.log(text);
  if (!text.find((t) => t === student.role))
    return (
      <div className="flex justify-center items-center h-[80%] w-full text-4xl font-bold">
        <IoIosWarning className="text-red-500 mr-4" />
        <h1>Access Denied</h1>
      </div>
    );
  return <>{children}</>;
}
