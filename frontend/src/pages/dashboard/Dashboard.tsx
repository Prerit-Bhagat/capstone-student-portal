import { DashboardLayout } from "../../layout/AppLayout";
import { Card, CardContent } from "../../components/ui/card";
import { User } from "lucide-react";

// export default function DashboardPage() {
//   // Mock student data - this would come from your database
//   const studentData = {
//     name: "Neeraj Kumar",
//     rollNumber: "101903123",
//     fatherName: "Rajesh Kumar",
//     motherName: "Sunita Kumar",
//     dateOfBirth: "15/08/2001",
//     dept: "Computer Science Engineering",
//     course: "B.Tech",
//     semester: "7th Semester",
//   };

//   return (
//     <DashboardLayout title="Dashboard">
//       <div className="mx-auto max-w-2xl">
//         <Card>
//           <CardContent className="p-8">
//             {/* Profile Icon */}
//             <div className="mb-8 flex justify-center">
//               <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
//                 <User className="h-12 w-12 text-gray-400" />
//               </div>
//             </div>

//             {/* Student Information */}
//             <div className="space-y-6">
//               <div className="grid gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Name
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.name}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Roll Number
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.rollNumber}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Father's Name
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.fatherName}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Mother's Name
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.motherName}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Date of Birth No
//                   </label>
//                   <p className="mt-1 text-gray-900">
//                     {studentData.dateOfBirth}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Dept
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.dept}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Course
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.course}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Semester
//                   </label>
//                   <p className="mt-1 text-gray-900">{studentData.semester}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// }
export default function DashboardPage() {
  const studentData = {
    name: "Prerit Bhagat",
    rollNumber: "102217030",
    fatherName: "Parvinder Kumar Bhagat",
    motherName: "Asha Rani",
    dateOfBirth: "05/04/2004",
    dept: "Computer Science Engineering",
    course: "Bachelor of Technology",
    semester: "7",
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="mx-auto max-w-2xl">
        {/* Profile Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Name</span>
            <span className="text-gray-900">{studentData.name || ""}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Roll Number</span>
            <span className="text-gray-900">{studentData.rollNumber}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Father's Name</span>
            <span className="text-gray-900">
              {studentData.fatherName || ""}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Mother's Name</span>
            <span className="text-gray-900">
              {studentData.motherName || ""}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Date of Birth No</span>
            <span className="text-gray-900">
              {studentData.dateOfBirth || ""}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Dept</span>
            <span className="text-gray-900">{studentData.dept || ""}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Course</span>
            <span className="text-gray-900">{studentData.course || ""}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Semester</span>
            <span className="text-gray-900">{studentData.semester || ""}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
