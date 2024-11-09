import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserAllApplications } from "../redux/authSlice";

const JOB_URI = import.meta.env.VITE_JOB_URI;
const APPLICATION_URI = import.meta.env.VITE_APPLICATION_URI;

const SingleJobPage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const jobApplications = useSelector(
    (state) => state.user.userAllApplications,
  );

  const [jobApplied, setJobApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isPageLoading, setIsPageLoading] = useState(true); // Loading state
  const [job, setJob] = useState({});
  const { jobId } = useParams();

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

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${JOB_URI}/get/${jobId}`);
      setJob(response.data.job);

      // Check if the job has been applied for
      jobApplications?.forEach((jobIdFromApplication) => {
        if (jobIdFromApplication?.job._id === jobId) {
          setJobApplied(true);
        }
      });
      setIsPageLoading(false);
    } catch (error) {
      console.error("Error fetching job details:", error);
      // Optionally, you can set an error state here to display an error message to the user
    }
  };

  const applyForJob = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${APPLICATION_URI}/apply/${jobId}`,
        null,
        {
          withCredentials: true, // Correctly placed here
        },
      );
      setJobApplied(true);
      job.applications.length = +1;
    } catch (error) {
      console.error("Error applying for job:", error);
      // Optionally, you can set an error state here to display an error message to the user
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchJobDetails();
    fetchUsersAllApplications();
  }, [dispatch]); // Add dispatch to the dependency array

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Loading....
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white">
      {/* Top Section: Job Info and Apply Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Company Logo + Job Title & Company */}
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

        {/* Apply Button */}
        {jobApplied ? (
          <Button variant="success" className="mt-4 md:mt-0 bg-gray-300">
            Applied
          </Button>
        ) : (
          <Button
            variant="default"
            className={`mt-4 md:mt-0 ${isLoading && "hidden"}`}
            onClick={applyForJob}
          >
            Apply Now
          </Button>
        )}
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
          <div>
            <span className="font-semibold">Job Location:</span>
            {" " + job?.location?.join(", ")}
          </div>
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
    </div>
  );
};

export default SingleJobPage;
