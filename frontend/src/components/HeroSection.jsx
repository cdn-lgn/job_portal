import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// API URI for fetching jobs
const JOB_URI = import.meta.env.VITE_JOB_URI;

const HeroSection = () => {
	const [latestJobs, setLatestJobs] = useState([]);
	const navigate = useNavigate();

	const fetchLatestJobs = async () => {
		try {
			const response = await axios.get(`${JOB_URI}/get`, {
				params: {
					limit: 6, // Limit to the latest 6 jobs
					sortBy: "createdAt", // Sort by the `createdAt` field
					order: "desc", // Order in descending to get the latest jobs first
				},
				withCredentials: true, // Include credentials if needed (like for authentication)
			});
			setLatestJobs(response.data.jobs); // Set the fetched jobs in the state
		} catch (error) {
			console.error("Error fetching latest jobs:", error);
		}
	};

	const jobDetailsPage = (jobId) => {
		navigate(`/jobs/${jobId}`);
	};

	useEffect(() => {
		fetchLatestJobs();
	}, []);

	return (
		<section className="flex flex-col items-center bg-gray-100 py-12 px-4">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">
					<span>Find Your</span>{" "}
					<span className="text-green-700">Dream Job</span>{" "}
					<span>Today!</span>
				</h1>
				<p className="text-lg text-gray-600">
					Search through thousands of job listings from top companies.
				</p>
			</div>

			{/* Latest Jobs Section */}
			<div className="pt-20 w-full max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
					Latest Jobs
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{latestJobs.map((job, index) => (
						<div
							key={index}
							className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<h3
								className="text-xl font-semibold cursor-pointer hover:underline"
								onClick={() => jobDetailsPage(job._id)}
							>
								{job.title}
							</h3>
							<p className="text-gray-600">
								{job?.company?.name}
							</p>
							<p className="text-gray-500">
								{job?.location?.join(", ")}
							</p>
							<div className="flex items-center justify-start gap-4">
								<span className="text-sm rounded-full px-2 py-1 mt-2 bg-purple-100 text-yellow-800">
									{job.salary}
								</span>
								<span
									className={`text-sm rounded-full px-2 py-1 mt-2 ${
										job.jobType === "Full-time"
											? "bg-blue-100 text-blue-800"
											: "bg-yellow-100 text-yellow-800"
									}`}
								>
									{job.jobType}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* View All Jobs Button */}
				<div className="text-center mt-8">
					<Button
						onClick={() => navigate("/jobs")}
						className="bg-green-700 text-white hover:bg-green-800"
					>
						View All Jobs
					</Button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
