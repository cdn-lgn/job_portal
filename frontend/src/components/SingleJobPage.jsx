import React from "react";
import { Button } from "@/components/ui/button";

const job = {
  jobTitle: "Frontend Developer",
  company: "Tech Solutions",
  companyLogo: "https://github.com/shadcn.png",
  description: "We are looking for a skilled frontend developer...",
  jobLocation: "New York, USA",
  jobType: "Full-time",
  noOfOpenings: 3,
  applicantsApplied: 25,
  salary: "12 LPA",
};

const SingleJobPage = () => {
  return (
    <div className="mx-auto p-6 bg-white">
      {/* Top Section: Job Info and Apply Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Company Logo + Job Title & Company */}
        <div className="flex items-start gap-4">
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>

        {/* Apply Button */}
        <Button variant="default" className="mt-4 md:mt-0">
          Apply Now
        </Button>
      </div>

      {/* Job Details */}
      <div className="mt-8 flex items-start justify-center flex-col gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">Job Location:</span>{" "}
            {job.jobLocation}
          </div>
          <div>
            <span className="font-semibold">Job Type:</span> {job.jobType}
          </div>
          <div>
            <span className="font-semibold">Number of Openings:</span>{" "}
            {job.noOfOpenings}
          </div>
          <div>
            <span className="font-semibold">Applicants Applied:</span>{" "}
            {job.applicantsApplied}
          </div>
          <div>
            <span className="font-semibold">Salary:</span> {job.salary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobPage;
