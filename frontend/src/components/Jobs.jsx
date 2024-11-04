import React, { useState } from "react";
import SearchBar from "./shared/SearchBar";
import { Input } from "@/components/ui/input"; // Shadcn/UI Input Component
import { Button } from "@/components/ui/button"; // Shadcn/UI Button Component
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select"; // Shadcn/UI Select Component

const allJobs = [
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
		country: "Canada",
		company: "DevCorp",
		salary: "10 LPA",
		jobType: "Full-time",
		category: "Backend",
	},
	{
		jobTitle: "UX/UI Designer",
		country: "UK",
		company: "DesignHub",
		salary: "8 LPA",
		jobType: "Part-time",
		category: "Design",
	},
	{
		jobTitle: "Data Scientist",
		country: "Germany",
		company: "DataWorks",
		salary: "15 LPA",
		jobType: "Full-time",
		category: "Data",
	},
	{
		jobTitle: "Product Manager",
		country: "Australia",
		company: "Innovate Inc.",
		salary: "20 LPA",
		jobType: "Full-time",
		category: "Management",
	},
	{
		jobTitle: "DevOps Engineer",
		country: "India",
		company: "Cloudify",
		salary: "14 LPA",
		jobType: "Part-time",
		category: "DevOps",
	},
];

const AllJobs = () => {
	// State for filters
	const [location, setLocation] = useState("");
	const [jobType, setJobType] = useState("");
	const [category, setCategory] = useState("");
	const [salaryRange, setSalaryRange] = useState("");

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-8 bg-gray-100">
			<div className="w-full flex items-center justify-center">
				<SearchBar />
			</div>

			<div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
				{/* Filter Sidebar */}
				<div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6">Filter Jobs</h2>

					{/* Location Filter */}
					<div className="mb-4">
						<Input
							placeholder="Location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</div>

					{/* Job Type Filter */}
					<div className="mb-4">
						<Select onValueChange={setJobType}>
							<SelectTrigger>
								<SelectValue placeholder="Select Job Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Job Types
								</SelectItem>
								<SelectItem value="Full-time">
									Full-time
								</SelectItem>
								<SelectItem value="Part-time">
									Part-time
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Category Filter */}
					<div className="mb-4">
						<Select onValueChange={setCategory}>
							<SelectTrigger>
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Categories
								</SelectItem>
								<SelectItem value="Frontend">
									Frontend
								</SelectItem>
								<SelectItem value="Backend">Backend</SelectItem>
								<SelectItem value="Design">Design</SelectItem>
								<SelectItem value="Data">Data</SelectItem>
								<SelectItem value="Management">
									Management
								</SelectItem>
								<SelectItem value="DevOps">DevOps</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Salary Range Filter */}
					<div className="mb-4">
						<Select onValueChange={setSalaryRange}>
							<SelectTrigger>
								<SelectValue placeholder="Select Salary Range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Salaries
								</SelectItem>
								<SelectItem value="0-10">0 - 10 LPA</SelectItem>
								<SelectItem value="10-15">
									10 - 15 LPA
								</SelectItem>
								<SelectItem value="15-20">
									15 - 20 LPA
								</SelectItem>
								<SelectItem value="20-30">
									20 - 30 LPA
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Reset Button */}
					<Button
						variant="outline"
						className="w-full mt-4"
						onClick={() => {
							setLocation("");
							setJobType("all");
							setCategory("all");
							setSalaryRange("all");
						}}
					>
						Reset Filters
					</Button>
				</div>

				{/* Job List */}
				<div className="w-full md:w-2/3">
					<h2 className="text-3xl font-bold mb-6">Available Jobs</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{allJobs.map((job, index) => (
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
									<span
										className={`text-sm rounded-full px-2 py-1 mt-2 bg-purple-100 text-yellow-800"}`}
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
