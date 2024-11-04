import React from "react";
import { Facebook, Instagram, Github, Send } from "lucide-react";

const Footer = () => {
	return (
		<footer className="flex justify-between items-center p-4 bg-gray-100 border-t">
			<div className="text-sm text-gray-600">
				© 2024 JOB-Li. All Rights Reserved.
			</div>
			<div className="flex items-center gap-4">
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-blue-600 transition"
				>
					<Facebook className="w-5 h-5" />
				</a>
				<a
					href="https://www.instagram.com/cdn_lgn/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-pink-500 transition"
				>
					<Instagram className="w-5 h-5" />
				</a>
				<a
					href="https://github.com/cdn-lgn"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-black transition"
				>
					<Github className="w-5 h-5" />
				</a>
				<a
					href="https://telegram.org"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-blue-400 transition"
				>
					<Send className="w-5 h-5" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
