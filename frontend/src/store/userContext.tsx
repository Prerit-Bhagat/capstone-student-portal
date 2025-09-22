// import React, { createContext } from "react";

// export interface StudentInterface {
//   _id: string;
//   name: string;
//   email: string;
//   gender: string;
//   mobile_no: string;
//   dob?: Date;
//   addr?: string;
//   role?: string;
//   roll_no: string;
//   hostel?: string;
//   year?: string;
//   room_no?: string;
//   department?: string;
// }

// export const StudentContext = createContext<{
//   student: StudentInterface;
//   dispatch: React.Dispatch<React.SetStateAction<StudentInterface>>;
// }>({
//   student: {
//     _id: "",
//     name: "",
//     email: "",
//     gender: "",
//     mobile_no: "",
//     dob: new Date(),
//     addr: "",
//     roll_no: "",
//     role: "student",
//     hostel: "",
//     year: "",
//     room_no: "",
//     department: "",
//   },
//   dispatch: () => {},
// });
import { api } from "../utils/axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Student {
  id: string;
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

type UserContextType = {
  user: Student | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    avatar?: File
  ) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const login = async (roll_no: string, password: string) => {
    setLoading(true);
    try {
      await api.post("/api/auth/login", { roll_no, password });
      await getUser();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    avatar?: File
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      await api.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await getUser();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<Student>("/api/auth/get-user");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const state = useContext(UserContext);
  if (!state) throw new Error("useUser must be used within UserProvider");
  return state;
}

export { UserProvider, useUser };
