// // import {
// //   Calendar,
// //   FileText,
// //   Heart,
// //   LayoutDashboard,
// //   LogOut,
// //   X,
// // } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import { useState } from "react";
// // import { Input } from "../../components/ui/input";
// // import Button from "../../components/ui/Button";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { useContext } from "react";
// // import { StudentContext } from "../store/userContext";
// // import { ToastContainer, toast } from "react-toastify";
// // import { api } from "../lib/utils";

// // function cn(...classes: (string | undefined | null | false)[]) {
// //   return classes.filter(Boolean).join(" ");
// // }

// // const links = [
// //   {
// //     role: "student",
// //     links: [
// //       {
// //         name: "Dashboard",
// //         href: "/app/student/dashboard",
// //         logo: <LayoutDashboard className="mr-3 h-5 w-5" />,
// //       },
// //       {
// //         name: "Attendance",
// //         href: "/app/student/attendance",
// //         logo: <FileText className="mr-3 h-5 w-5" />,
// //       },
// //     ],
// //   },
// // ];

// // interface SidebarProps {
// //   isOpen?: boolean;
// //   onClose?: () => void;
// // }

// // export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
// //   const { student } = useContext(StudentContext);
// //   // const links1 = links.find((link) => link.role === student.role)?.links;
// //   const links1 = links.find((link) => link.role === student?.role)?.links || [];

// //   const navigate = useNavigate();
// //   async function logout() {
// //     const response = await api.get(`/user/logout`);
// //     console.log(response.status);
// //     navigate("/auth");
// //   }
// //   return (
// //     <>
// //       {/* Sidebar container */}
// //       <div
// //         className={cn(
// //           "flex h-full w-80 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50",
// //           "fixed md:relative",
// //           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
// //         )}
// //       >
// //         {/* Logo */}
// //         <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
// //           <div className="flex items-center gap-2">
// //             <div className="flex h-8 w-8 items-center justify-center rounded-md">
// //               <Heart className="h-5 w-5 text-white" />
// //             </div>
// //             <span className="text-lg md:text-xl font-bold">TIET MediHub</span>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="md:hidden p-2 hover:bg-gray-700 rounded-md"
// //           >
// //             <X className="h-5 w-5" />
// //           </button>
// //         </div>

// //         {/* Navigation */}
// //         <div className="px-4">
// //           <nav className="space-y-2">
// //             {links.map((item) => {
// //               const isActive = window.location.pathname === item.href;
// //               return (
// //                 <Link
// //                   key={item.name}
// //                   to={item.href}
// //                   onClick={onClose}
// //                   className={cn(
// //                     "flex w-full items-center gap-3 rounded-md px-3 py-2",
// //                     isActive
// //                       ? "bg-blue-600 text-white"
// //                       : "text-gray-300 hover:bg-gray-700"
// //                   )}
// //                 >
// //                   <item.icon className="h-5 w-5" />
// //                   {item.name}
// //                 </Link>
// //               );
// //             })}
// //           </nav>
// //         </div>

// //         {/* Logout at bottom */}
// //         <div className="mt-auto px-4 pb-4">
// //           <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
// //             <LogOut className="h-5 w-5" />
// //             Log out
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
// import {
//   Calendar,
//   FileText,
//   Heart,
//   LayoutDashboard,
//   LogOut,
//   X,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// // import {} from "../store/userContext";
// import { api } from "../lib/utils";

// function cn(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// const links = [
//   {
//     role: "student",
//     links: [
//       {
//         name: "Dashboard",
//         href: "/dashboard",
//         logo: <LayoutDashboard className="mr-3 h-5 w-5" />,
//       },
//       {
//         name: "Attendance",
//         href: "/appointment",
//         logo: <FileText className="mr-3 h-5 w-5" />,
//       },
//       {
//         name: "Past-Reports",
//         href: "/past-reports",
//         logo: <FileText className="mr-3 h-5 w-5" />,
//       },
//     ],
//   },
// ];

// interface SidebarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

// export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
//   // const context = useContext(StudentContext);
//   // if (!context) throw new Error("Sidebar must be used inside StudentProvider");
//   // const { student } = context;

//   const navigate = useNavigate();

//   // get links for current role
//   const links1 = links.find((link) => link.role === student?.role)?.links || [];

//   async function logout() {
//     await api.get(`/user/logout`);
//     localStorage.removeItem("student"); // clear persistence
//     navigate("/auth");
//   }

//   return (
//     <div
//       className={cn(
//         "flex h-full w-80 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50",
//         "fixed md:relative",
//         isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//       )}
//     >
//       {/* Logo */}
//       <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
//         <div className="flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-md">
//             <Heart className="h-5 w-5 text-white" />
//           </div>
//           <span className="text-lg md:text-xl font-bold">TIET MediHub</span>
//         </div>
//         <button
//           onClick={onClose}
//           className="md:hidden p-2 hover:bg-gray-700 rounded-md"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Navigation */}
//       <div className="px-4">
//         <nav className="space-y-2">
//           {links1.map((item) => {
//             const isActive = window.location.pathname === item.href;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 onClick={onClose}
//                 className={cn(
//                   "flex w-full items-center gap-3 rounded-md px-3 py-2",
//                   isActive
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-300 hover:bg-gray-700"
//                 )}
//               >
//                 {item.logo}
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Logout */}
//       <div className="mt-auto px-4 pb-4">
//         <button
//           onClick={logout}
//           className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
//         >
//           <LogOut className="h-5 w-5" />
//           Log out
//         </button>
//       </div>
//     </div>
//   );
// }
import {
  Calendar,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../store/userContext";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const allLinks = [
  {
    role: "student",
    links: [
      {
        name: "Dashboard",
        href: "/dashboard",
        logo: <LayoutDashboard className="mr-3 h-5 w-5" />,
      },
      {
        name: "Attendance",
        href: "/appointment",
        logo: <FileText className="mr-3 h-5 w-5" />,
      },
      {
        name: "Past-Reports",
        href: "/past-reports",
        logo: <FileText className="mr-3 h-5 w-5" />,
      },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user) return null; // hide sidebar if not logged in

  const links = allLinks.find((l) => l.role === user.role)?.links || [];

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div
      className={cn(
        "flex h-full w-80 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50",
        "fixed md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold">TIET MediHub</span>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-gray-700 rounded-md"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="px-4">
        <nav className="space-y-2">
          {links.map((item) => {
            const isActive = window.location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                {item.logo}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-auto px-4 pb-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
