import React from "react";
import SearchBar from "./shared/SearchBar";
import { Button } from "@/components/ui/button"; // 👈 Shadcn/UI Button Component
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const jobTitles = [
	"Frontend Developer",
	"Backend Developer",
	"UX/UI Designer",
	"Data Scientist",
	"Product Manager",
	"DevOps Engineer",
	"Full Stack Developer",
];
const latestJobs = [
	{
		jobTitle: "Frontend Developer",
		country: "USA",
		company: "Tech Solutions",
		salary: "12 LPA",
		jobType: "Full-time",
	},
	{
		jobTitle: "Backend Developer",
		country: "Canada",
		company: "DevCorp",
		salary: "10 LPA",
		jobType: "Full-time",
	},
	{
		jobTitle: "UX/UI Designer",
		country: "UK",
		company: "DesignHub",
		salary: "8 LPA",
		jobType: "Part-time",
	},
	{
		jobTitle: "Data Scientist",
		country: "Germany",
		company: "DataWorks",
		salary: "15 LPA",
		jobType: "Full-time",
	},
	{
		jobTitle: "Product Manager",
		country: "Australia",
		company: "Innovate Inc.",
		salary: "20 LPA",
		jobType: "Full-time",
	},
	{
		jobTitle: "DevOps Engineer",
		country: "India",
		company: "Cloudify",
		salary: "14 LPA",
		jobType: "Part-time",
	},
];

const HeroSection = () => {
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
			{/* Search Tab */}
			<SearchBar />
			{/* Carousel Space */}
			<div className="w-full max-w-4xl flex items-center justify-center">
				<Carousel className="w-full max-w-lg">
					<CarouselContent className="max-w-xs">
						{jobTitles.map((item, index) => (
							<CarouselItem key={index}>
								<div className="px-4 py-2 bg-white rounded-full w-fit cursor-pointer">
									{item}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
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
		</section>
	);
};

export default HeroSection;
