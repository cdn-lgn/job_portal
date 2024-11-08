import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

//not uderstand
export const applyForJob = async (req, res) => {
	try {
		const userId = req.id;
		const jobId = req.params.jobId;

		if (!jobId) {
			return res.status(400).json({
				message: "job id required",
				success: false,
			});
		}

		const isUserAlreadyApplied = await Application.findOne({
			job: jobId,
			applicant: userId,
		});

		if (isUserAlreadyApplied) {
			return res.status(400).json({
				message: "user Already applied for this job",
				success: false,
			});
		}

		const isJobExist = await Job.findById(jobId);

		if (!isJobExist) {
			return res.status(400).json({
				message: "job does not exist",
				success: false,
			});
		}

		const jobApplication = await Application.create({
			job: jobId,
			applicant: userId,
		});
		console.log("jobApplication._id", jobApplication._id);
		isJobExist.applications.push(jobApplication._id);
		await isJobExist.save();

		return res.status(200).json({
			message: "apllied for job successfully",
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const getAppliedJobs = async (req, res) => {
	try {
		const applicantId = req.id;
		const appliedJobs = await Application.find({
			applicant: applicantId,
		})
			.sort({ createdAt: -1 })
			.populate({
				path: "job",
				options: { sort: { createdAt: -1 } },
				populate: {
					path: "company",
					options: { sort: { createdAt: -1 } },
				},
			});

		if (!appliedJobs) {
			return res.status(400).json({
				message: "not applied at any job",
				success: true,
			});
		}
		return res.status(200).json({
			message: "apllied jobs",
			appliedJobs,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const getAllAppliedApplicant = async (req, res) => {
	try {
		const jobId = req.params.id;

		// Check if the job exists
		const isJobExist = await Job.findById(jobId);
		if (!isJobExist) {
			return res.status(400).json({
				message: "Job does not exist",
				success: false,
			});
		}

		// Fetch the job and populate the applications and applicant details
		const jobWithApplicants = await Job.findById(jobId).populate({
			path: "applications",
			options: { sort: { createdAt: -1 } },
			populate: { path: "applicant" }, // Populate the applicant field
		});

		// Check if applications exist
		if (
			!jobWithApplicants.applications ||
			jobWithApplicants.applications.length === 0
		) {
			return res.status(200).json({
				message: "No applicants found for this job",
				applicants: [],
				success: true,
			});
		}

		// Return the populated applicants
		return res.status(200).json({
			message: "Applied jobs",
			applicants: jobWithApplicants.applications, // This should now contain full applicant details
			success: true,
		});
	} catch (error) {
		console.error("Error fetching applicants:", error.message);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};
export const updateApplicationStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const applicationId = req.params.id;

		const application = await Application.findById(applicationId);

		if (!application) {
			return res.status(400).json({
				message: "application does not exist",
				success: false,
			});
		}

		application.status = status.toLowerCase();
		await application.save();

		return res.status(200).json({
			message: "upadated jobs status",
			application,
			success: true,
		});
	} catch (error) {
		console.log(error.message);
	}
};
