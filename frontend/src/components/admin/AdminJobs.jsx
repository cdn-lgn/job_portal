import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "../../hooks/use-toast";

const COMPANY_URI = import.meta.env.VITE_COMPANY_URI;
const JOB_URI = import.meta.env.VITE_JOB_URI;

const AdminJobs = () => {
	const { toast } = useToast();
	const [companies, setCompanies] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [showDialog, setShowDialog] = useState(false); // state for dialog visibility
	const navigate = useNavigate();

	// Navigate to job details page
	const jobDetailsPage = (jobId) => {
		navigate(`/jobs/${jobId}`);
	};

	// Handle job creation
	const newJobHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const dataObject = Object.fromEntries(formData.entries());

		// Convert requirements and location to arrays
		dataObject.requirements = dataObject.requirements
			?.split(",")
			.map((req) => req.trim());
		dataObject.location = dataObject.location
			?.split(",")
			.map((loc) => loc.trim());

		try {
			const response = await axios.post(`${JOB_URI}/post`, dataObject, {
				headers: { "Content-Type": "multipart/form-data" },
				withCredentials: true,
			});
			setJobs((prevJobs) => [...prevJobs, response.data.newJob]);
			toast({ title: "Job added successfully" });
			setShowDialog(false); // close dialog on success
		} catch (error) {
			toast({
				title: "Something went wrong",
				description: error.message || "Please try again.",
			});
		}
	};

	// Fetch companies list
	const fetchCompanyList = async () => {
		try {
			const response = await axios.get(`${COMPANY_URI}/get`, {
				withCredentials: true,
			});
			setCompanies(response.data.companies);
		} catch (error) {
			console.error("Error fetching company list:", error);
		}
	};

	// Fetch jobs list
	const fetchJobs = async () => {
		try {
			const response = await axios.get(`${JOB_URI}/admin-jobs`, {
				withCredentials: true,
			});
			setJobs(response.data.postedJobs);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		}
	};

	// Initial data fetch
	useEffect(() => {
		fetchJobs();
		fetchCompanyList();
	}, []);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-end items-center mb-4">
				{/* Button for creating a job */}
				<Dialog open={showDialog} onOpenChange={setShowDialog}>
					<DialogTrigger asChild>
						<Button
							variant="secondary"
							onClick={() => setShowDialog(true)}
						>
							Create Job
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create New Job</DialogTitle>
						</DialogHeader>
						<form onSubmit={newJobHandler}>
							<div className="flex flex-col gap-4">
								<input
									className="border p-2 rounded"
									placeholder="Job Title"
									name="title"
									required
								/>
								<input
									className="border p-2 rounded"
									placeholder="Job Description"
									name="description"
									required
								/>
								<select
									className="border p-2 rounded"
									name="companyId"
									required
								>
									<option value="">
										{companies.length
											? "Select a Company"
											: "No Companies Available"}
									</option>
									{companies.map((company) => (
										<option
											key={company._id}
											value={company._id}
										>
											{company.name}
										</option>
									))}
								</select>
								<input
									className="border p-2 rounded"
									placeholder="Job requirements (comma separated)"
									name="requirements"
									required
								/>
								<input
									className="border p-2 rounded"
									placeholder="Salary"
									name="salary"
								/>
								<input
									className="border p-2 rounded"
									placeholder="Job Location (comma separated)"
									name="location"
								/>
								<input
									className="border p-2 rounded"
									placeholder="Openings"
									name="noOfOpening"
									type="number"
								/>
								<select
									className="border p-2 rounded"
									name="jobType"
									required
								>
									<option value="Full-time">Full-time</option>
									<option value="Part-time">Part-time</option>
									<option value="Contract">Contract</option>
								</select>
								<Button type="submit" className="mt-2">
									Submit
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Job cards display */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{jobs.map((job) => (
					<div
						key={job._id}
						className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
					>
						<h3
							className="text-xl font-semibold cursor-pointer hover:underline"
							onClick={() => jobDetailsPage(job._id)}
						>
							{job.title}
						</h3>
						<p className="text-gray-600">{job?.company?.name}</p>
						<div>
							<span className="font-semibold">Job Location:</span>
							{" " + job?.location?.join(", ")}
						</div>
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
		</div>
	);
};

export default AdminJobs;
