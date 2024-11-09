import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { multerUpload } from "../middlewares/multerConfig.js";
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
			profile: { profilePhoto: fileUploadResult.fileUrl },
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

export const login = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		if (!email || !password || !role) {
			return res.status(400).json({
				message: "something is missing",
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

		const tokenData = {
			userId: user._id,
		};
		const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		user = {
			id: user._id,
			fullName: user.fullName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile,
		};
		return res
			.status(200)
			.cookie("token", token, {
				maxAge: 1 * 24 * 60 * 60 * 100,
				httpsOnly: true,
				sameSite: "strict",
			})
			.json({
				message: `welcome back ${user.fullName}`,
				user,
				success: true,
			});
	} catch (error) {
		console.log(error);
	}
};

export const logOut = async (req, res) => {
	try {
		return res
			.status(200)
			.cookie("token", "", { maxAge: 0 })
			.json({ message: "user logout successfullly", success: true });
	} catch (error) {
		console.log(error.message);
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { fullName, email, phoneNumber, bio, skills } = req.body;
		const userId = req.id; // Assuming req.id is set by your authentication middleware

		let fileUploadResult;
		// Handle file upload if present
		if (req.file) {
			// console.log("File path:", req.file.originalname); // Log the file name
			fileUploadResult = await uploadResponse(
				req.file.buffer,
				req.file.originalname,
			);
		}

		// Find the user by ID
		let user = await User.findById(userId); // Using findById for better readability
		if (!user) {
			return res.status(404).json({
				message: "User  not found",
				success: false,
			});
		}

		// Update user fields if provided
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

		// Process skills if provided
		if (skills) {
			const skillsArray = skills.split(",").map((skill) => skill.trim());
			user.profile.skills = skillsArray;
		}

		// Save the updated user document
		await user.save(); // Persist changes to the database

		return res.status(200).json({
			message: "User  profile updated successfully",
			user,
			success: true,
		});
	} catch (error) {
		console.error("Error updating profile:", error.message); // Log the error for debugging
		return res.status(500).json({
			message: "An error occurred while updating the profile.",
			success: false,
		});
	}
};
