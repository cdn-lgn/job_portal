// src/pages/Signup.js
import React from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const USER_URI = import.meta.env.VITE_USER_URI;

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData.entries());

    try {
      // Register user and get response
      const response = await axios.post(`${USER_URI}/register`, dataObject, {
        headers: {
          "Content-Type": "multipart/form-data", // Use the appropriate content type
        },
        withCredentials: true, // If you need to send cookies or credentials
      });

      console.log("User  registered successfully:", response.data); // Success message

      // Show a toast notification upon successful registration
      toast({
        title: "Registration Successful",
        description: "You can now log in.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error); // Error handling

      // Show a toast notification upon registration failure
      toast({
        title: "Registration Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <Input name="fullName" placeholder="Full Name" type="text" required />
        </div>

        <div className="mb-4">
          <Input name="email" placeholder="Email" type="email" required />
        </div>

        <div className="mb-4">
          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
            required
          />
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
        <div className="my-4">
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Profile Photo
          </label>
          <input
            id="profilePhoto"
            name="file"
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500"
            required
          />
        </div>

        <Button variant="default" className="w-full mt-4" type="submit">
          Sign Up
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
