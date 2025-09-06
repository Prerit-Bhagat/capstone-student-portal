// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Calendar,
//   FileText,
//   LogOut,
//   Heart,
//   X,
// } from "lucide-react";

// // simple className joiner
// function cn(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// // Dummy Avatar system (replace with your own if needed)
// function Avatar({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center rounded-full overflow-hidden",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// function AvatarFallback({
//   children,
//   className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center w-full h-full font-semibold",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Appointment", href: "/appointment", icon: Calendar },
//   { name: "Past Reports", href: "/past-reports", icon: FileText },
// ];

// interface SidebarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

// export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
//   // simulate pathname state (since no Next.js router)
//   const [pathname, setPathname] = useState("/dashboard");

//   const user = {
//     name: "Neeraj Kumar",
//     role: "Student",
//     studentId: "101903123",
//   };

//   return (
//     <>
//       {/* {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={onClose}
//         />
//       )}

//       <div
//         className={cn(
//           "flex h-full w-64 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50",
//           "fixed md:relative",
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         )}
//       > */}
//       {/* Logo */}
//       {/* <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
//           <div className="flex items-center gap-2">
//             <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500">
//               <Heart className="h-5 w-5 text-white" />
//             </div>
//             <span className="text-lg md:text-xl font-bold">ThaparCare</span>
//           </div>
//           <button
//             onClick={onClose}
//             className="md:hidden p-2 hover:bg-gray-700 rounded"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div> */}

//       {/* Navigation */}
//       <div className="px-4">
//         <nav className="space-y-2">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <button
//                 key={item.name}
//                 onClick={() => {
//                   setPathname(item.href);
//                   onClose?.();
//                 }}
//                 className={cn(
//                   "flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-left",
//                   isActive
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-300 hover:bg-gray-700"
//                 )}
//               >
//                 <item.icon className="h-5 w-5" />
//                 {item.name}
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* User Info + Logout */}
//       {/* <div className="mt-auto px-4 pb-4">
//           <div className="rounded bg-gray-700 p-3 mb-3">
//             <div className="flex items-center gap-3">
//               <Avatar className="h-8 w-8 bg-blue-500 text-white text-xs">
//                 <AvatarFallback>
//                   {user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="min-w-0 flex-1">
//                 <p className="text-sm font-medium truncate">{user.name}</p>
//                 <p className="text-xs text-gray-400">{user.studentId}</p>
//               </div>
//             </div>
//           </div>

//           <button className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
//             <LogOut className="h-5 w-5" />
//             Log out
//           </button>
//         </div>
//       </div> */}
//     </>
//   );
// }

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  LogOut,
  Heart,
  X,
} from "lucide-react";

// simple className joiner
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Appointment", href: "/appointment", icon: Calendar },
  { name: "Past Reports", href: "/past-reports", icon: FileText },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar container */}
      <div
        className={cn(
          "flex h-full w-64 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50",
          "fixed md:relative",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold">ThaparCare</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-700 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = window.location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex w-full items-center gap-3 rounded px-3 py-2 text-sm",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto px-4 pb-4">
          <button className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
