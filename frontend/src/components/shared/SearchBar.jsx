import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // 👈 Shadcn/UI Input Component
import { Search } from "lucide-react"; // 👈 Lucide-react icon

const SearchBar = () => {
	return (
		<div className="flex items-center gap-2 w-full max-w-lg mb-8">
			<Input
				placeholder="Search job title, keywords, or company"
				className="flex-grow"
			/>
			<Button variant="primary" className="flex items-center gap-2">
				<Search className="w-4 h-4" />
				<span className="hidden md:block">Search</span>
			</Button>
		</div>
	);
};

export default SearchBar;
