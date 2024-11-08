import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const JOB_URI = import.meta.env.VITE_JOB_URI;
const APPLICATION_URI = import.meta.env.VITE_APPLICATION_URI;

const AdminSingleJobPage = () => {
  const user = useSelector((state) => state.user.user);
  const jobApplications = useSelector(
    (state) => state.user.userAllApplications,
  );
  const [job, setJob] = useState({});
  const [applicants, setApplicants] = useState([]); // State to store job applicants
  const { jobId } = useParams();

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${JOB_URI}/get/${jobId}`, null, {
        withCredentials: true,
      });
      setJob(response.data.job);
      // Fetch applicants for this job
      // console.log(`${APPLICATION_URI}/${jobId}/applicant-list`);
      const applicantsResponse = await axios.get(
        `${APPLICATION_URI}/${jobId}/applicant-list`,
        {
          withCredentials: true,
        },
      );
      setApplicants(applicantsResponse.data.applicants);
      console.log(applicantsResponse.data.applicants);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const updateApplicationStatus = async (applicantId, status) => {
    try {
      await axios.put(
        `${APPLICATION_URI}/${applicantId}/update`,
        { status },
        {
          withCredentials: true,
        },
      );
      // Update status locally after a successful request
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === applicantId ? { ...applicant, status } : applicant,
        ),
      );
    } catch (error) {
      console.error("Error updating applicant status:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <div className="mx-auto p-6 bg-white">
      {/* Top Section: Job Info and Apply Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start gap-4">
          <img
            src={job?.company?.logo}
            alt={`${job?.company?.name} logo`}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{job?.title}</h2>
            <p className="text-gray-600">{job?.company?.name}</p>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-8 flex items-start justify-center flex-col gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job?.description}</p>
        </div>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">Job requirements:</span>
            {" " + job?.requirements?.join(", ")}
          </div>
          {job?.location?.map((loc, index) => (
            <div key={index}>
              <span className="font-semibold">Job Location:</span> {loc}
            </div>
          ))}
          <div>
            <span className="font-semibold">Job Type:</span> {job?.jobType}
          </div>
          <div>
            <span className="font-semibold">Number of Openings:</span>{" "}
            {job?.noOfOpening}
          </div>
          <div>
            <span className="font-semibold">Applicants Applied:</span>{" "}
            {job?.applications?.length || 0}
          </div>
          <div>
            <span className="font-semibold">Salary:</span> {job?.salary}
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Applicants</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-100 border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Resume
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id} className="border-t">
                  <td className="p-3">{applicant?.applicant?.fullName}</td>
                  <td className="p-3">
                    <a
                      href={applicant?.applicant?.profile?.resume?.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="p-3 capitalize">
                    <span className={`status-label ${applicant.status}`}>
                      {applicant.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {applicant.status === "pending" ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              updateApplicationStatus(applicant._id, "accepted")
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              updateApplicationStatus(applicant._id, "rejected")
                            }
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className="text-gray-500">
                          Status cannot be changed
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleJobPage;
