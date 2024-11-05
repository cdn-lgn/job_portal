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

		console.log(req.body);

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
		//not understand
		const query = {
			$or: [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		};
		const jobs = await Job.find(query)
			.populate({ path: "company" })
			.sort({ createdAt: -1 });

		if (!jobs) {
			return res.status(400).json({
				message: "no jobs found",
				success: true,
			});
		}

		return res.status(200).json({
			message: "Jobs found",
			jobs,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const getJobById = async (req, res) => {
	try {
		const jobId = req.params.id;

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
