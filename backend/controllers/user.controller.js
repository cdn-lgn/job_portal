import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadResponse } from "../utils/imagekitConfig.js";

// Register Function
export const register = async (req, res) => {
	try {
		const { fullName, email, phoneNumber, password, role } = req.body;

		// Validate required fields
		if (!fullName || !email || !phoneNumber || !password || !role) {
			return res.status(400).json({
				message: "Something is missing",
				success: false,
			});
		}

		// Check if user already exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: "User already exists with this email",
				success: false,
			});
		}

		let fileUploadResult;
		// Handle file upload if present
		if (req.file) {
			fileUploadResult = await uploadResponse(
				req.file.buffer,
				req.file.originalname,
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		user = await User.create({
			fullName,
			email,
			phoneNumber,
			password: hashedPassword,
			role,
			profile: {
				profilePhoto: fileUploadResult
					? fileUploadResult.fileUrl
					: null,
			},
		});

		return res.status(200).json({
			user,
			message: "User created successfully",
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

// Login Function
export const login = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		if (!email || !password || !role) {
			return res.status(400).json({
				message: "Something is missing",
				success: false,
			});
		}

		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: "Incorrect email or password",
				success: false,
			});
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(400).json({
				message: "Incorrect email or password",
				success: false,
			});
		}
		if (role !== user.role) {
			return res.status(400).json({
				message: "Account does not exist with current role",
				success: false,
			});
		}

		// Generate the JWT token with user ID
		const tokenData = { userId: user._id };
		const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		// Set the token in a cookie with secure settings
		res.cookie("token", token, {
			maxAge: 24 * 60 * 60 * 1000, // 1 day
			httpOnly: true, // Only accessible by the backend
			secure: true, // Only over HTTPS
			sameSite: "strict", // Helps prevent CSRF attacks
		});

		// Send response with the user information
		res.status(200).json({
			message: `Welcome back, ${user.fullName}!`,
			user: {
				id: user._id,
				fullName: user.fullName,
				email: user.email,
				phoneNumber: user.phoneNumber,
				role: user.role,
				profile: user.profile,
			},
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

// Logout Function
export const logOut = async (req, res) => {
	try {
		// Clear the token cookie
		res.cookie("token", "", { maxAge: 0, httpOnly: true });
		return res.status(200).json({
			message: "User logged out successfully",
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Logout failed",
			success: false,
		});
	}
};

// Update Profile Function
export const updateProfile = async (req, res) => {
	try {
		const { fullName, email, phoneNumber, bio, skills } = req.body;
		const userId = req.id; // Assuming req.id is set by your authentication middleware

		let fileUploadResult;
		if (req.file) {
			fileUploadResult = await uploadResponse(
				req.file.buffer,
				req.file.originalname,
			);
		}

		let user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		if (fullName) user.fullName = fullName;
		if (email) user.email = email;
		if (phoneNumber) user.phoneNumber = phoneNumber;
		if (bio) user.profile.bio = bio;
		if (fileUploadResult) {
			user.profile.resume = {
				resumeLink: fileUploadResult.fileUrl,
				resumeName: fileUploadResult.fileName,
			};
		}
		if (skills) {
			const skillsArray = skills.split(",").map((skill) => skill.trim());
			user.profile.skills = skillsArray;
		}

		await user.save();
		return res.status(200).json({
			message: "User profile updated successfully",
			user,
			success: true,
		});
	} catch (error) {
		console.error("Error updating profile:", error.message);
		return res.status(500).json({
			message: "An error occurred while updating the profile.",
			success: false,
		});
	}
};
