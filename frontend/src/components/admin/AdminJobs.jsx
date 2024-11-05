import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
const COMPANY_URI = import.meta.env.VITE_COMPANY_URI;
const JOB_URI = import.meta.env.VITE_JOB_URI;

const AdminJobs = () => {
	const [companies, setCompanies] = useState([]);
	// Dummy data for job cards
	const [jobs] = useState([
		{
			jobTitle: "Frontend Developer",
			country: "USA",
			company: "Tech Solutions",
			salary: "12 LPA",
			jobType: "Full-time",
			category: "Frontend",
		},
	]);

	const newJobHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const dataObject = Object.fromEntries(formData.entries());

		// Convert requirements and location to arrays
		if (dataObject.requirements) {
			dataObject.requirements = dataObject.requirements
				.split(",")
				.map((req) => req.trim());
		}
		if (dataObject.location) {
			dataObject.location = dataObject.location
				.split(",")
				.map((loc) => loc.trim());
		}

		console.log(dataObject);
		try {
			const response = await axios.post(`${JOB_URI}/post`, dataObject, {
				headers: {
					"Content-Type": "multipart/form-data", // JSON data bhejne ke liye
				},
				withCredentials: true, // Agar aapko cookies ya credentials bhejna hai
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCompanyList = async () => {
		try {
			const response = await axios.get(`${COMPANY_URI}/get`, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			});
			setCompanies(response.data.companies); // Store companies in state
			console.log(response.data.companies);
		} catch (error) {
			console.error("Error fetching company list:", error);
		}
	};

	const handleCreateJobDialogOpen = () => {
		fetchCompanyList(); // Fetch companies when the dialog opens
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-end items-center mb-4">
				<div className="flex gap-4">
					{/* Button for creating a job */}
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="secondary"
								onClick={handleCreateJobDialogOpen}
							>
								Create Job
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New Job</DialogTitle>
							</DialogHeader>
							<form onSubmit={newJobHandler}>
								{/* Form fields for job details */}
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
										name="companyId" // Ensure this is included in the FormData
										required
									>
										<option value="">Select</option>
										{companies?.map((company) => (
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
										<option value="Full-time">
											Full-time
										</option>
										<option value="Part-time">
											Part-time
										</option>
										<option value="Contract">
											Contract
										</option>
									</select>
									<Button type="submit" className="mt-2">
										Submit
									</Button>
								</div>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* Job cards display */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{jobs.map((job, index) => (
					<div
						key={index}
						className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
					>
						<h3 className="text-xl font-semibold cursor-pointer hover:underline">
							{job.jobTitle}
						</h3>
						<p className="text-gray-600">{job.company}</p>
						<p className="text-gray-500">{job.country}</p>
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
