// src/pages/Login.js
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

const USER_URI = import.meta.env.VITE_USER_URI;

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(`${USER_URI}/login`, dataObject, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Assuming you want to show a toast notification upon a successful response
      dispatch(setUser(response.data.user));
      toast({
        title: "Logged in successfully",
      });
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <Input name="email" placeholder="Email" type="email" required />
        </div>

        <div className="mb-4">
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
          />
        </div>
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <input id="Student" type="radio" name="role" value="Student" />
            <label htmlFor="Student">Student</label>
          </div>
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <input id="Recruiter" type="radio" name="role" value="Recruiter" />
            <label htmlFor="Recruiter">Recruiter</label>
          </div>
        </div>

        <Button variant="default" className="w-full mt-4" type="submit">
          Login
        </Button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
