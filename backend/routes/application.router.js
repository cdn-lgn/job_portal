import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
	applyForJob,
	getAllAppliedApplicant,
	getAppliedJobs,
	updateApplicationStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:jobId").post(isAuthenticated, applyForJob);
router.route("/list").get(isAuthenticated, getAppliedJobs);
router
	.route("/:id/applicant-list")
	.get(isAuthenticated, getAllAppliedApplicant);
router.route("/:id/update").put(isAuthenticated, updateApplicationStatus);

export default router;
