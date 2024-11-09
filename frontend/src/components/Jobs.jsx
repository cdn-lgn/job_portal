import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Shadcn/UI Input Component
import { Button } from "@/components/ui/button"; // Shadcn/UI Button Component
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select"; // Shadcn/UI Select Component
import { useNavigate } from "react-router-dom";
import axios from "axios";
const JOB_URI = import.meta.env.VITE_JOB_URI;

const AllJobs = () => {
	// State for available filters
	const [availableLocations, setAvailableLocations] = useState([]);
	const [availableJobTypes, setAvailableJobTypes] = useState([]);
	const [availableSalaryRanges, setAvailableSalaryRanges] = useState([]);
	const [jobs, setJobs] = useState([]);

	// State for selected filter values
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [selectedJobType, setSelectedJobType] = useState(null);
	const [selectedSalaryRange, setSelectedSalaryRange] = useState(null);

	const navigate = useNavigate();

	const fetchJobs = async () => {
		try {
			const response = await axios.get(`${JOB_URI}/get`, {
				withCredentials: true,
			});
			const fetchedJobs = response.data.jobs;
			setJobs(fetchedJobs);

			// Collect unique values for each filter
			const uniqueLocations = new Set();
			const uniqueJobTypes = new Set();
			const uniqueSalaryRanges = new Set();

			fetchedJobs.forEach((job) => {
				// Normalize and add location to the Set
				if (Array.isArray(job.location)) {
					const locationString = job.location.join(", ");
					uniqueLocations.add(locationString);
				} else if (job.location) {
					uniqueLocations.add(job.location);
				}
				// Add other job properties to their respective Sets
				uniqueJobTypes.add(job.jobType);
				uniqueSalaryRanges.add(job.salary);
			});

			// Convert unique locations Set back to an array and split it by ", " to flatten it
			const flattenedLocations = Array.from(uniqueLocations)
				.join(", ")
				.split(", ")
				.filter((item, index, self) => self.indexOf(item) === index);

			// Update state with unique values
			setAvailableLocations(flattenedLocations);
			setAvailableJobTypes([...uniqueJobTypes]);
			setAvailableSalaryRanges([...uniqueSalaryRanges]);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		}
	};

	const jobDetailsPage = (jobId) => {
		navigate(`/jobs/${jobId}`);
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	// Filter jobs based on selected filters only (no search)
	const filteredJobs = jobs.filter((job) => {
		const matchesLocation =
			!selectedLocation ||
			job.location.toLowerCase().includes(selectedLocation.toLowerCase());
		const matchesJobType =
			!selectedJobType ||
			job.jobType.toLowerCase() === selectedJobType.toLowerCase();
		const matchesSalaryRange =
			!selectedSalaryRange ||
			job.salary.toLowerCase() === selectedSalaryRange.toLowerCase();

		return matchesLocation && matchesJobType && matchesSalaryRange;
	});

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-8 bg-gray-100">
			{/* Filters */}
			<div className="w-full flex flex-col md:flex-row items-start justify-between gap-10">
				{/* Filter Sidebar */}
				<div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6">Filter Jobs</h2>

					{/* Location Filter */}
					<div className="mb-4">
						<Select
							onValueChange={(val) => setSelectedLocation(val)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Location" />
							</SelectTrigger>
							<SelectContent>
								{availableLocations?.map((loc, idx) => (
									<SelectItem key={idx} value={loc}>
										{loc}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Job Type Filter */}
					<div className="mb-4">
						<Select
							onValueChange={(val) => setSelectedJobType(val)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Job Type" />
							</SelectTrigger>
							<SelectContent>
								{availableJobTypes?.map((type, idx) => (
									<SelectItem key={idx} value={type}>
										{type}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Salary Range Filter */}
					<div className="mb-4">
						<Select
							onValueChange={(val) => setSelectedSalaryRange(val)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Salary Range" />
							</SelectTrigger>
							<SelectContent>
								{availableSalaryRanges?.map((range, idx) => (
									<SelectItem key={idx} value={range}>
										{range}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Reset Button */}
					<Button
						variant="outline"
						className="w-full mt-4"
						onClick={() => {
							setSelectedLocation(null);
							setSelectedJobType(null);
							setSelectedSalaryRange(null);
						}}
					>
						Reset Filters
					</Button>
				</div>

				{/* Job List */}
				<div className="w-full md:w-2/3">
					<h2 className="text-3xl font-bold mb-6">Available Jobs</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredJobs?.map((job, index) => (
							<div
								key={index}
								className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
							>
								<h3
									className="text-xl font-semibold cursor-pointer hover:underline"
									onClick={() => jobDetailsPage(job._id)}
								>
									{job.title}{" "}
									{/* Displaying original title case */}
								</h3>
								<p className="text-gray-600">
									{job?.company?.name}
								</p>
								<p className="text-gray-500">
									{job?.location?.join(", ")}
								</p>
								<div className="flex items-center justify-start gap-4">
									<span
										className={`text-sm rounded-full px-2 py-1 mt-2 bg-purple-100 text-yellow-800`}
									>
										{job.salary}
									</span>
									<span
										className={`text-sm rounded-full px-2 py-1 mt-2 ${job.jobType === "Full-time" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
									>
										{job.jobType}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllJobs;
