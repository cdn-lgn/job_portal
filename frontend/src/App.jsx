import React from "react";
import { Route, Routes } from "react-router-dom";
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
import { resetUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  if (!Cookies.get("token")) {
    dispatch(resetUser());
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* 👈 Add Navbar at the top */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          {user.role === "Recruiter" && (
            <Route path="/companies" element={<AdminCompanies />} />
          )}
          <Route
            path="/jobs"
            element={user?.role === "Recruiter" ? <AdminJobs /> : <AllJobs />}
          />
          <Route path="/job/:id" element={<SingleJobPage />} />
          {/* 👈 Renders at /app/ */}
        </Routes>
      </div>
      <Footer /> {/* 👈 Add Footer at the bottom */}
    </div>
  );
}

export default App;
