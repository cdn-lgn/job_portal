import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

export const postJob = async (req, res) => {
	try {
		const userId = req.id;
		const {
			title,
			description,
			requirements,
			location,
			jobType,
			noOfOpening,
			companyId,
			salary,
		} = req.body;

		// console.log(req.body);

		if (
			!title ||
			!description ||
			!requirements ||
			!location ||
			!jobType ||
			!noOfOpening ||
			!companyId ||
			!salary
		) {
			return res.status(400).json({
				message: "something is missing",
				success: false,
			});
		}
		const company = await Company.findById(companyId);
		const newJob = await Job.create({
			title,
			description,
			requirements,
			location,
			jobType,
			noOfOpening,
			company: companyId,
			salary,
			createdBy: userId,
		});

		return res.status(200).json({
			message: "Job created successfullly",
			newJob,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const getAllJobs = async (req, res) => {
	try {
		const keyword = req.query.keyword || "";
		const limit = req.query.limit ? parseInt(req.query.limit) : 0; // Default to no limit (fetch all)
		const sortBy = req.query.sortBy || "createdAt"; // Default to sorting by createdAt
		const order = req.query.order === "asc" ? 1 : -1; // Default to descending order

		// Construct the query for keyword search (if provided)
		const query = {
			$or: [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		};

		// Prepare the query chain for MongoDB
		let queryChain = Job.find(query)
			.populate({ path: "company" })
			.sort({ [sortBy]: order }); // Dynamic sorting based on the `sortBy` and `order` params

		// Apply the limit if it's greater than 0
		if (limit > 0) {
			queryChain = queryChain.limit(limit);
		}

		// Execute the query
		const jobs = await queryChain;

		if (!jobs || jobs.length === 0) {
			return res.status(400).json({
				message: "No jobs found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Jobs found",
			jobs,
			success: true,
		});
	} catch (error) {
		console.error("Error fetching jobs:", error.message);
		return res.status(500).json({
			message: "Server error",
			success: false,
		});
	}
};

export const getJobById = async (req, res) => {
	try {
		const jobId = req.params.jobId;

		const job = await Job.findById(jobId).populate({ path: "company" });

		if (!job) {
			return res.status(400).json({
				message: "job not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "job found",
			job,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const postedJobByUser = async (req, res) => {
	try {
		const userId = req.id;
		const postedJobs = await Job.find({ createdBy: userId }).populate({
			path: "company",
		});
		if (!postedJobs) {
			return res.status(400).json({
				message: "job not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "job found",
			postedJobs,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};
