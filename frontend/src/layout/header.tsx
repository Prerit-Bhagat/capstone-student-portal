// import { Menu } from "lucide-react";
// import { useState } from "react";

// interface HeaderProps {
//   title: string;
//   onMenuClick?: () => void;
//   user?: {
//     name: string;
//     role: string;
//     avatar?: string;
//   };
// }

// export function Header({
//   title,
//   onMenuClick,
//   user = { name: "Sukhi Singh", role: "Student" },
// }: HeaderProps) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
//       {/* Left: Menu button + Title */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={onMenuClick}
//           className="md:hidden p-2 hover:bg-gray-100 rounded"
//         >
//           <Menu className="h-5 w-5" />
//         </button>
//         <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">
//           {title}
//         </h1>
//       </div>

//       {/* Right: Avatar + Dropdown */}
//       <div className="relative">
//         <button
//           onClick={() => setMenuOpen((prev) => !prev)}
//           className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
//         >
//           {/* Avatar */}
//           <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">
//             {user.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt={user.name}
//                 className="h-full w-full rounded-full object-cover"
//               />
//             ) : (
//               user.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//             )}
//           </div>

//           {/* Name + Role (hide on mobile) */}
//           <div className="hidden sm:block text-left">
//             <p className="text-sm font-medium">{user.name}</p>
//             <p className="text-xs text-gray-500">{user.role}</p>
//           </div>
//         </button>

//         {/* Dropdown Menu */}
//         {menuOpen && (
//           <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
//             <button
//               className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//               onClick={() => setMenuOpen(false)}
//             >
//               Profile
//             </button>
//             <button
//               className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//               onClick={() => setMenuOpen(false)}
//             >
//               Settings
//             </button>
//             <button
//               className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//               onClick={() => setMenuOpen(false)}
//             >
//               Log out
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
import { Menu } from "lucide-react";
import { useState } from "react";
import { useUser } from "../store/userContext";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();

  if (!user) return null; // hide header if not logged in

  const handleLogout = async () => {
    await logout();
    // optionally navigate to /auth here
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      {/* Left: Menu button + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">
          {title}
        </h1>
      </div>

      {/* Right: Avatar + Dropdown */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
        >
          {/* Avatar */}
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">
            {/* {user.avatar ? (
              <img
                // src={user.avatar}
                src="https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-male-student-icon-png-image_864959.jpg"
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            )} */}
            <img
              src="https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-male-student-icon-png-image_864959.jpg"
              alt="image"
            />
          </div>

          {/* Name + Role (hide on mobile) */}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
