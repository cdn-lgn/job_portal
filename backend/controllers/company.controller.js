import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import { uploadResponse } from "../utils/imagekitConfig.js";

export const registerCompany = async (req, res) => {
	try {
		const { name, description, location, website } = req.body;
		let fileUploadResult;

		// Handle file upload if present
		if (req.file) {
			console.log("File path:", req.file.originalname); // Log the file name
			fileUploadResult = await uploadResponse(
				req.file.buffer,
				req.file.originalname,
			);
		}

		if (!name) {
			return res.status(400).json({
				message: "Please enter company name",
				success: false,
			});
		}

		const checkName = await Company.findOne({ name });
		if (checkName) {
			return res.status(400).json({
				message: "Company already registered with this name.",
				success: false,
			});
		}

		const companyData = {
			name,
			description,
			location,
			website,
			addBy: req.id,
		};

		if (fileUploadResult) {
			companyData.logo = fileUploadResult.fileUrl; // Only add logo if file upload was successful
		}

		await Company.create(companyData);

		return res.status(201).json({
			message: "Company registered successfully",
			success: true,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			message: "An error occurred while registering the company.",
			success: false,
			error: error.message,
		});
	}
};

export const getCompany = async (req, res) => {
	try {
		const addBy = req.id;
		const companies = await Company.find({ addBy });
		if (!companies) {
			return res.status(400).json({
				message: "No company registered by user",
				success: false,
			});
		}

		console.log("User ID during fetching:", req.id);

		return res.status(200).json({
			message: "company registered by user",
			companies,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const getCompanyById = async (req, res) => {
	try {
		const companyId = req.params.id;
		const company = await Company.findById(companyId);

		if (!company) {
			return res.status(400).json({
				message: "company not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "company found",
			company,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const updateCompany = async (req, res) => {
	try {
		const { name, description, location, website } = req.body;
		const updateData = { name, description, location, website };
		const logoFile = req.file;
		const company = await Company.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true },
		);
		if (!company) {
			return res.status(400).json({
				message: "company not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "company information updated",
			company,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};
