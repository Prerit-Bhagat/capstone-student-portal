import React, { useState } from "react";
import { Input } from "../components/ui/input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../store/userContext";

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
