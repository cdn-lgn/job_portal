import React, { useState } from "react";
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

const AdminJobs = () => {
	const newJobHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const dataObject = Object.fromEntries(formData.entries());
		try {
			console.log("new job crated");
		} catch (error) {
			console.log(error.message);
		}
	};

	const newCompanyHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const dataObject = Object.fromEntries(formData.entries());
		try {
			const response = await axios.post(
				`${COMPANY_URI}/register`,
				dataObject,
				{
					headers: {
						"Content-Type": "multipart/form-data", // JSON data bhejne ke liye
					},
					withCredentials: true, // Agar aapko cookies ya credentials bhejna hai
				},
			);
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

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
		{
			jobTitle: "Backend Developer",
			country: "Germany",
			company: "Backend Masters",
			salary: "15 LPA",
			jobType: "Part-time",
			category: "Backend",
		},
		{
			jobTitle: "UX/UI Designer",
			country: "UK",
			company: "Design Pros",
			salary: "10 LPA",
			jobType: "Contract",
			category: "Design",
		},
		{
			jobTitle: "Full Stack Engineer",
			country: "India",
			company: "Startup Hub",
			salary: "18 LPA",
			jobType: "Full-time",
			category: "Full Stack",
		},
	]);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-end items-center mb-4">
				<div className="flex gap-4">
					{/* Button for adding a company */}
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="secondary">Add Company</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Company</DialogTitle>
							</DialogHeader>
							<form onSubmit={newCompanyHandler}>
								{/* Form fields for company details */}
								<div className="flex flex-col gap-4">
									<input
										className="border p-2 rounded"
										placeholder="Company Name"
										name="name"
										required
									/>
									<input
										className="border p-2 rounded"
										placeholder="Description"
										name="description"
									/>
									<input
										className="border p-2 rounded"
										placeholder="Website"
										name="website"
									/>
									<input
										className="border p-2 rounded"
										placeholder="Location"
										name="location"
									/>
									<div className="my-4">
										<label
											htmlFor="profilePhoto"
											className="block text-sm font-medium text-gray-700"
										>
											Upload Profile Photo
										</label>
										<input
											id="profilePhoto"
											name="file"
											type="file"
											accept="image/*"
											className="mt-1 block w-full text-sm text-gray-500"
											required
										/>
									</div>
									<Button type="submit" className="mt-2">
										Submit
									</Button>
								</div>
							</form>
						</DialogContent>
					</Dialog>

					{/* Button for creating a job */}
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="secondary">Create Job</Button>
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
										required
									/>
									<select
										className="border p-2 rounded"
										placeholder="Select Company"
									>
										<option value="Tech Solutions">
											Tech Solutions
										</option>
										<option value="Backend Masters">
											Backend Masters
										</option>
										<option value="Design Pros">
											Design Pros
										</option>
										<option value="Startup Hub">
											Startup Hub
										</option>
									</select>
									<input
										className="border p-2 rounded"
										placeholder="Salary"
									/>
									<input
										className="border p-2 rounded"
										placeholder="Country"
									/>
									<select className="border p-2 rounded">
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
