// NavBar.jsx
import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { DoorOpen, User, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/redux/authSlice";
import { store } from "../../redux/store";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const USER_URI = import.meta.env.VITE_USER_URI;

const NavBar = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate("/profile");
	};

	const logOutHandler = async () => {
		try {
			const response = await axios.post(`${USER_URI}/logout`, {
				withCredentials: true,
			});

			// Remove the cookie from the frontend
			Cookies.remove("token"); // Replace with your actual cookie name

			// Reset the user state in Redux
			dispatch(resetUser());

			// Navigate to the login page
			navigate("/login");
		} catch (error) {
			console.log(error.message); // Corrected typo from error.messaage to error.message
		}
	};

	return (
		<nav className="flex justify-between px-4 py-2 items-center bg-gray-100 w-full">
			<div className="text-3xl font-bold">
				<span>JOB</span>
				<span className="text-green-700">-Li</span>
			</div>

			<div className="flex items-center gap-4">
				<Link to="/" className="cursor-pointer hover:underline">
					Home
				</Link>
				{user?.role === "Recruiter" && (
					<Link
						to="/companies"
						className="cursor-pointer hover:underline"
					>
						Companies
					</Link>
				)}
				<Link to="/jobs" className="cursor-pointer hover:underline">
					Jobs
				</Link>

				{user ? (
					<div>
						<Popover>
							<PopoverTrigger>
								<Avatar>
									<AvatarImage
										src={user?.profile?.profilePhoto}
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</PopoverTrigger>
							<PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-64">
								<div className="flex items-center gap-3 mb-4">
									<Avatar className="w-10 h-10">
										<AvatarImage
											src={user?.profile?.profilePhoto}
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div>
										<h1 className="text-sm font-semibold text-gray-800">
											{user?.fullName}
										</h1>
										<h6 className="text-xs text-gray-500">
											{user?.profile?.bio
												? user?.profile?.bio
												: "NA"}
										</h6>
									</div>
								</div>
								<hr className="my-2" />
								<div className="space-y-2">
									<div
										className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
										onClick={navigateToProfile}
									>
										<User className="w-4 h-4 text-gray-600" />
										<span className="text-sm font-medium text-gray-800">
											Profile
										</span>
									</div>
									<div
										className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
										onClick={logOutHandler}
									>
										<LogOut className="w-4 h-4 text-gray-600" />
										<span className="text-sm font-medium text-gray-800">
											Logout
										</span>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<Button variant="outline" className="cursor-pointer">
							<Link to="/login">Login</Link>
						</Button>
						<Button variant="outline" className="cursor-pointer">
							<Link to="/signup">Signup</Link>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
