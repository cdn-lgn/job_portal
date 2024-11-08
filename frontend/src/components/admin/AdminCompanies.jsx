import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const COMPANY_URI = import.meta.env.VITE_COMPANY_URI;

const AdminJobs = () => {
	const { toast } = useToast();
	const [companies, setCompanies] = useState([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false); // State for managing dialog open/close

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
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				},
			);
			setCompanies([...companies, response.data.company]);
			toast({
				title: "Job created successfully",
			});
			setIsDialogOpen(false); // Close the dialog on successful submission
		} catch (error) {
			console.log(error);
			toast({
				variant: "destructive",
				description: error?.response?.data?.message,
			});
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
			setCompanies(response.data.companies);
			console.log(response.data.companies);
		} catch (error) {
			console.error("Error fetching company list:", error);
		}
	};

	useEffect(() => {
		fetchCompanyList(); // Fetch company list on component mount
	}, []);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-end items-center mb-4">
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							variant="secondary"
							onClick={() => setIsDialogOpen(true)}
						>
							Add Company
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Company</DialogTitle>
							<DialogClose
								onClick={() => setIsDialogOpen(false)}
							/>
						</DialogHeader>
						<form onSubmit={newCompanyHandler}>
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
			</div>
			{/* Company cards display */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{companies.map((company) => (
					<div
						key={company._id} // Use a unique identifier for the key
						className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
					>
						<img
							src={company.logo}
							alt={`${company.name} logo`}
							className="w-16 h-16 mb-2"
						/>
						<h3 className="text-xl font-semibold cursor-pointer hover:underline">
							{company.name}
						</h3>
						<p className="text-gray-600">{company.description}</p>
						<p className="text-gray-500">{company.website}</p>
						<p className="text-gray-500">{company.location}</p>
						<div className="mt-4 flex space-x-2">
							<Button onClick={() => handleEdit(company)}>
								Edit
							</Button>
							<Button
								onClick={() => handleDelete(company._id)}
								variant="danger"
							>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminJobs;
