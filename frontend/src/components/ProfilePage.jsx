import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { setUserAllApplications } from "../redux/authSlice";

const APPLICATION_URI = import.meta.env.VITE_APPLICATION_URI;
const USER_URI = import.meta.env.VITE_USER_URI;

const ProfilePage = () => {
  const jobApplications = useSelector(
    (state) => state.user.userAllApplications,
  );
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const fetchUsersAllApplications = async () => {
    try {
      const response = await axios.get(`${APPLICATION_URI}/list`, {
        withCredentials: true,
      });
      dispatch(setUserAllApplications(response.data.appliedJobs));
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.put(
        `${USER_URI}/profile/update`,
        formData, // Use formData directly
        {
          headers: {
            "Content-Type": "multipart/form-data", // No need to set this, axios handles it
          },
          withCredentials: true,
        },
      );

      dispatch(setUser(response.data.user));
      toast({ title: "Profile updated" });
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message,
      );
    }
  };
  useEffect(() => {
    fetchUsersAllApplications();
  }, []);
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Profile Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <img
            src={user.profile.profilePhoto}
            alt={`${user.fullName} profile`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-gray-600">{user.profile?.bio}</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription></DialogDescription>
              <DialogTitle className="pb-4">
                Are you absolutely sure?
              </DialogTitle>
              <form onSubmit={handleSave}>
                {/* Rest of the Form Fields */}
                <div className="mb-4">
                  <Input
                    name="fullName"
                    placeholder="Full Name"
                    defaultValue={user.fullName}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    defaultValue={user.email}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    defaultValue={user.phoneNumber}
                    type="text"
                    required
                  />
                </div>

                <div className="mb-4">
                  <Input
                    name="bio"
                    placeholder="Bio"
                    defaultValue={user.profile?.bio}
                    type="text"
                  />
                </div>
                {user.role === "Student" && (
                  <>
                    <div className="mb-4">
                      <Input
                        name="skills"
                        placeholder="Skills (comma separated)"
                        defaultValue={user.profile.skills?.join(",")}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        name="file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="block w-full text-sm text-gray-600"
                      />
                    </div>
                  </>
                )}

                <DialogClose asChild>
                  <Button variant="default" type="submit" className="w-full">
                    Save Changes
                  </Button>
                </DialogClose>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Phone Number:</span>{" "}
          {user.phoneNumber}
        </div>

        {/* Show skills and resume*/}
        {user.role === "Student" ? (
          <>
            <div>
              <span className="font-semibold">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.profile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-black text-white rounded-full px-2 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-semibold">Resume:</span>
              <a
                href={user.profile?.resume?.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 pl-2"
              >
                {user.profile?.resume?.resumeName}
              </a>
            </div>
          </>
        ) : (
          <div>
            <span className="font-semibold">role:</span> {user.role}
          </div>
        )}
      </div>

      {/* Show Jobs Table Only if Role is Student */}
      {user.role === "Student" && (
        <div className="bg-white p-6 pt-10">
          <h3 className="text-xl font-bold mb-4">Jobs Applied</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Applied Date</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications?.map((job, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-2">{job?.createdAt?.split("T")[0]}</td>
                  <td className="px-4 py-2">{job?.job?.company?.name}</td>
                  <td className="px-4 py-2">{job?.job.title}</td>
                  <td
                    className={`px-4 py-2 ${
                      job.status === "Accepted"
                        ? "text-green-600"
                        : job.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {job.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
