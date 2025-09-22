import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./pages/appointment/Appointment";
import Dashboard from "./pages/dashboard/Dashboard";
import { Auth } from "./pages/Auth/Login";
// import PastReports from "./pages/PastReports";
import { UserProvider } from "./store/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import Appointment from "./pages/Appointment";
// // import Dashboard from "./pages/Dashboard";
// // import Home from "./pages/home/home";
// // import PastReports from "./pages/PastReports";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/appointment" element={<Appointment />} />
// //         <Route path="/past-reports" element={<PastReports />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";
// // import Dashboard from "./pages/dashboard/Dashboard";
// // import { Auth } from "./pages/home/home";
// // import Appointment from "./pages/appointment/Appointment";
// // import PastReports from "./pages/past-reports/PastReports";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Redirect root ("/") to "/dashboard" */}
// //         <Route path="/" element={<Auth />} />

// //         {/* App pages */}
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/appointment" element={<Appointment />} />
// //         <Route path="/past-reports" element={<PastReports />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";
// import { Auth } from "./pages/home/home";
// import Appointment from "./pages/appointment/Appointment";
// import PastReports from "./pages/past-reports/PastReports";

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Auth />, // login page
//     },
//     {
//       path: "/dashboard",
//       element: <Dashboard />,
//     },
//     {
//       path: "/appointment",
//       element: <Appointment />,
//     },
//     {
//       path: "/past-reports",
//       element: <PastReports />,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;
