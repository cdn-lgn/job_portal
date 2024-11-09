import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Shadcn/UI Input Component
import { Search } from "lucide-react"; // Lucide-react icon
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState(""); // State for search query
	const navigate = useNavigate(); // Initialize useNavigate hook

	const handleSearch = () => {
		if (searchQuery) {
			navigate(`/jobs?search=${searchQuery}`); // Redirect to /jobs with query
		}
	};

	return (
		<div className="flex items-center gap-2 w-full max-w-lg mb-8">
			<Input
				placeholder="Search job title, keywords, or company"
				className="flex-grow"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
			/>
			<Button
				variant="primary"
				className="flex items-center gap-2"
				onClick={handleSearch}
			>
				<Search className="w-4 h-4" />
				<span className="hidden md:block">Search</span>
			</Button>
		</div>
	);
};

export default SearchBar;
