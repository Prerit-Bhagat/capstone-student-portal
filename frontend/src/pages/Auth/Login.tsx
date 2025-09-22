import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../../store/userContext";

interface LoginFormData {
  roll_no: string;
  password: string;
}

export function Auth() {
  const { login, loading, user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    roll_no: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.roll_no, formData.password);
      toast.success("Logged in successfully!");
      navigate("/"); // go to home/dashboard
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Input
          type="text"
          name="roll_no"
          placeholder="Roll Number"
          value={formData.roll_no}
          onChange={handleChange}
          required
          className="mb-4"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mb-4"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Input } from "../../components/ui/input";
// import Button from "../../components/ui/Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import { api } from "../../lib/utils";

// interface SignupFormData {
//   name: string;
//   password: string;
// }

// export function Auth() {
//   const [formData, setFormData] = useState<SignupFormData>({
//     name: "",
//     password: "",
//   });
//   const { dispatch } = useContext(StudentContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await api.post(`/api/auth/login`, formData);
//       console.log("Success:", response.data);

//       const { role } = response.data;
//       dispatch(response.data);

//       if (role) {
//         navigate(`/app/${role}/dashboard`);
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const { response } = error;
//         if (response) {
//           console.log("Error Status:", response.status);
//           toast.error(response.data.message);
//         } else {
//           console.log("No response from server", error.message);
//         }
//       } else {
//         console.log("Non-Axios error:", error);
//       }
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="h-screen w-full">
//       <ToastContainer />
//       <div
//         className="h-full w-full fixed flex items-center justify-center p-4 blur-sm z-[10]"
//         style={{
//           backgroundImage: `url("/bg.jpeg")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       ></div>
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6 relative top-[20%] left-[20%] z-[999]">
//         <div className="flex items-center gap-3">
//           <img
//             src="/tiet_logo.jpg"
//             alt="TIET Logo"
//             width={40}
//             height={40}
//             className="object-contain"
//           />
//           <h1 className="text-2xl font-semibold text-gray-800">TIET MEDIHUB</h1>
//         </div>

//         <div>
//           <h2 className="text-xl font-medium text-gray-700">Log in</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-rows-2 gap-4 mb-5">
//             <div>
//               <Input
//                 type="text"
//                 name="name"
//                 placeholder="Username"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <Input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <a
//                 href="/forgot-password"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </div>
//           </div>
//           <Button>Login</Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useState, useContext } from "react";
// // import { Input } from "@/components/ui/input";
// // import Button from "@/components/Button";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { userContext } from "@/store/userContext";
// // import { ToastContainer, toast } from "react-toastify";
// // import { api } from "../../lib/utils";

// // interface SignupFormData {
// //   name: string;
// //   staffId?: string;
// //   roll_no?: string;
// //   password: string;
// //   role: string;
// //   gender: string;
// //   age?: string;
// //   mobile_no: string;
// //   dob?: string;
// //   email: string;
// //   addr?: string;
// //   department?: string;
// //   room_no?: string;
// //   hostel?: string;
// //   year?: string;
// // }

// // interface LoginFormData {
// //   emailOrMobile: string;
// //   password: string;
// // }

// // export function Auth() {
// //   const [isSignup, setIsSignup] = useState(false);
// //   const { dispatch } = useContext(userContext);
// //   const navigate = useNavigate();

// //   const [signupData, setSignupData] = useState<SignupFormData>({
// //     name: "",
// //     staffId: "",
// //     roll_no: "",
// //     password: "",
// //     role: "student",
// //     gender: "",
// //     age: "",
// //     mobile_no: "",
// //     dob: "",
// //     email: "",
// //     addr: "",
// //     department: "",
// //     room_no: "",
// //     hostel: "",
// //     year: "",
// //   });

// //   const [loginData, setLoginData] = useState<LoginFormData>({
// //     emailOrMobile: "",
// //     password: "",
// //   });

// //   const handleToggle = () => setIsSignup((prev) => !prev);

// //   const handleSignupChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
// //   ) => {
// //     setSignupData({ ...signupData, [e.target.name]: e.target.value });
// //   };

// //   const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setLoginData({ ...loginData, [e.target.name]: e.target.value });
// //   };

// //   const handleSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await api.post(`/user/register`, signupData);
// //       console.log("Signup Successful:", response.data);
// //       toast.success("Account created successfully! Please log in.");
// //       setIsSignup(false);
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Signup failed");
// //     }
// //   };

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await api.post("/user/login", loginData);
// //       console.log("Login Successful:", response.data);
// //       dispatch({ type: "LOGIN", payload: response.data });
// //       navigate("/"); // Navigate to the home page after login
// //       toast.success("Logged in successfully!");
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div className="h-screen w-full flex items-center justify-center">
// //       <ToastContainer />
// //       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6">
// //         <div className="flex items-center gap-3">
// //           <h1 className="text-2xl font-semibold text-gray-800">TIET MEDIHUB</h1>
// //         </div>

// //         <h2 className="text-xl font-medium text-gray-700">
// //           {isSignup ? "Sign Up" : "Log In"}
// //         </h2>

// //         <p className="text-sm text-gray-500">
// //           {isSignup ? "Already have an account?" : "Don't have an account?"}
// //           <button className="text-red-500 ml-2" onClick={handleToggle}>
// //             {isSignup ? "Log in" : "Sign up"}
// //           </button>
// //         </p>

// //         {isSignup ? (
// //           <form onSubmit={handleSignup} className="space-y-3">
// //             {/* Signup form fields */}
// //             <Input
// //               type="text"
// //               name="name"
// //               placeholder="Full Name"
// //               value={signupData.name}
// //               onChange={handleSignupChange}
// //               required
// //             />
// //             <Input
// //               type="email"
// //               name="email"
// //               placeholder="Email"
// //               value={signupData.email}
// //               onChange={handleSignupChange}
// //               required
// //             />
// //             <Input
// //               type="text"
// //               name="mobile_no"
// //               placeholder="Mobile Number"
// //               value={signupData.mobile_no}
// //               onChange={handleSignupChange}
// //               required
// //             />
// //             <Input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               value={signupData.password}
// //               onChange={handleSignupChange}
// //               required
// //             />

// //             <select
// //               name="role"
// //               value={signupData.role}
// //               onChange={handleSignupChange}
// //               className="w-full p-2 border rounded-md"
// //             >
// //               <option value="student">Student</option>
// //               <option value="worker">Worker</option>
// //               <option value="doctor">Doctor</option>
// //               <option value="receptionist">Receptionist</option>
// //               <option value="paramedic">Paramedic</option>
// //             </select>

// //             <Input
// //               type="text"
// //               name="staffId"
// //               placeholder="Staff ID (If applicable)"
// //               value={signupData.staffId}
// //               onChange={handleSignupChange}
// //             />
// //             <Input
// //               type="text"
// //               name="roll_no"
// //               placeholder="Roll Number (If Student)"
// //               value={signupData.roll_no}
// //               onChange={handleSignupChange}
// //             />

// //             <Input
// //               type="text"
// //               name="age"
// //               placeholder="Age"
// //               value={signupData.age}
// //               onChange={handleSignupChange}
// //             />
// //             <Input
// //               type="date"
// //               name="dob"
// //               placeholder="Date of Birth"
// //               value={signupData.dob}
// //               onChange={handleSignupChange}
// //             />

// //             <select
// //               name="gender"
// //               value={signupData.gender}
// //               onChange={handleSignupChange}
// //               className="w-full p-2 border rounded-md"
// //             >
// //               <option value="" disabled>
// //                 Select Gender
// //               </option>
// //               <option value="male">Male</option>
// //               <option value="female">Female</option>
// //               <option value="other">Other</option>
// //             </select>

// //             <Input
// //               type="text"
// //               name="addr"
// //               placeholder="Address"
// //               value={signupData.addr}
// //               onChange={handleSignupChange}
// //             />
// //             <Input
// //               type="text"
// //               name="department"
// //               placeholder="Department"
// //               value={signupData.department}
// //               onChange={handleSignupChange}
// //             />
// //             <Input
// //               type="text"
// //               name="room_no"
// //               placeholder="Room Number"
// //               value={signupData.room_no}
// //               onChange={handleSignupChange}
// //             />
// //             <Input
// //               type="text"
// //               name="hostel"
// //               placeholder="Hostel Name"
// //               value={signupData.hostel}
// //               onChange={handleSignupChange}
// //             />
// //             <Input
// //               type="text"
// //               name="year"
// //               placeholder="Year of Study"
// //               value={signupData.year}
// //               onChange={handleSignupChange}
// //             />

// //             <Button>Sign Up</Button>
// //           </form>
// //         ) : (
// //           <form onSubmit={handleLogin} className="space-y-4">
// //             <Input
// //               type="text"
// //               name="emailOrMobile"
// //               placeholder="Email or Mobile Number"
// //               value={loginData.emailOrMobile}
// //               onChange={handleLoginChange}
// //               required
// //             />
// //             <Input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               value={loginData.password}
// //               onChange={handleLoginChange}
// //               required
// //             />
// //             <Button>Login</Button>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
