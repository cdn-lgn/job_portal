import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import Home from "./components/Home";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import Signup from "./components/Signup";
import AllJobs from "./components/Jobs";
import AdminJobs from "./components/admin/AdminJobs";
import AdminCompanies from "./components/admin/AdminCompanies";
import SingleJobPage from "./components/SingleJobPage";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer"; // 👈 Import Footer component
import Cookies from "js-cookie";
import { resetUser, setUserAllApplications } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NotFound from "./components/NotFound"; // Import NotFound component
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component

const APPLICATION_URI = import.meta.env.VITE_APPLICATION_URI;

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const fetchUsersAllApplications = async () => {
    try {
      const response = await axios.get(`${APPLICATION_URI}/list`, {
        withCredentials: true,
      });
      dispatch(setUserAllApplications(response.data.appliedJobs));
      console.log(response);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUsersAllApplications();
    } else {
      dispatch(resetUser());
    }
  }, [dispatch]); // Add dispatch to the dependency array

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* 👈 Add Navbar at the top */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <ProtectedRoute requiredRole="Recruiter">
                <AdminCompanies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              user?.role === "Student" ? (
                <AllJobs />
              ) : (
                <ProtectedRoute requiredRole="Recruiter">
                  <AdminJobs />
                </ProtectedRoute>
              )
            }
          />
          <Route path="/jobs/:jobId" element={<SingleJobPage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />{" "}
          {/* Redirect all unknown routes to NotFound */}
        </Routes>
      </div>
      <Footer /> {/* 👈 Add Footer at the bottom */}
    </div>
  );
}

export default App;
