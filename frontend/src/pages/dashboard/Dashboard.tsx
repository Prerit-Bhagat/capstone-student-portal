import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/userContext";
import Button from "../../components/ui/Button";

export default function DashboardPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
        <p>
          <strong>Roll No:</strong> {user.rollNumber}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Mobile:</strong> {user.mobile_no}
        </p>
        <p>
          <strong>Department:</strong> {user.department || "N/A"}
        </p>
        <p>
          <strong>Hostel:</strong> {user.hostel || "N/A"}
        </p>
        <p>
          <strong>Year:</strong> {user.year || "N/A"}
        </p>
        <p>
          <strong>Room No:</strong> {user.room_no || "N/A"}
        </p>

        <Button className="mt-6" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

// import { DashboardLayout } from "../../layout/AppLayout";
// import { Card, CardContent } from "../../components/ui/card";
// import { User } from "lucide-react";
// import Access from "../../common/access";

// export default function DashboardPage() {
//   const studentData = {
//     name: "Prerit Bhagat",
//     rollNumber: "102217030",
//     fatherName: "Parvinder Kumar Bhagat",
//     motherName: "Asha Rani",
//     dateOfBirth: "05/04/2004",
//     dept: "Computer Science Engineering",
//     course: "Bachelor of Technology",
//     semester: "7",
//   };

//   return (
//     <DashboardLayout title="Dashboard">
//       <div className="mx-auto max-w-2xl">
//         {/* Profile Icon */}
//         <div className="mb-8 flex justify-center">
//           <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
//             <User className="h-12 w-12 text-gray-400" />
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Name</span>
//             <span className="text-gray-900">{studentData.name || ""}</span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Roll Number</span>
//             <span className="text-gray-900">{studentData.rollNumber}</span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Father's Name</span>
//             <span className="text-gray-900">
//               {studentData.fatherName || ""}
//             </span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Mother's Name</span>
//             <span className="text-gray-900">
//               {studentData.motherName || ""}
//             </span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Date of Birth No</span>
//             <span className="text-gray-900">
//               {studentData.dateOfBirth || ""}
//             </span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Dept</span>
//             <span className="text-gray-900">{studentData.dept || ""}</span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Course</span>
//             <span className="text-gray-900">{studentData.course || ""}</span>
//           </div>

//           <div className="flex items-center justify-between py-2">
//             <span className="text-gray-600">Semester</span>
//             <span className="text-gray-900">{studentData.semester || ""}</span>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
