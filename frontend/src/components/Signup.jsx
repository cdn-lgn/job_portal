// src/pages/Signup.js
import React from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const USER_URI = import.meta.env.VITE_USER_URI;

const Signup = () => {
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${USER_URI}/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data", // JSON data bhejne ke liye
        },
        withCredentials: true, // Agar aapko cookies ya credentials bhejna hai
      });

      return response.data; // Response data return karein
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message,
      );
      throw error; // Error ko propagate karein
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData.entries());

    try {
      const response = await registerUser(dataObject); // Register user and get response
      console.log("User registered successfully:", response); // Success message
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error); // Error handling
    }

    // console.log(dataObject); // Form data console par dikhai de
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
