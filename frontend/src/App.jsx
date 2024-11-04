import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import Signup from "./components/Signup";
import AllJobs from "./components/Jobs";
import SingleJobPage from "./components/SingleJobPage";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer"; // 👈 Import Footer component

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* 👈 Add Navbar at the top */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/profile" element={<ProfilePage />} />{" "}
          <Route path="/jobs" element={<AllJobs />} />{" "}
          <Route path="/job/:id" element={<SingleJobPage />} />{" "}
          {/* 👈 Renders at /app/ */}
        </Routes>
      </div>
      <Footer /> {/* 👈 Add Footer at the bottom */}
    </div>
  );
}

export default App;
