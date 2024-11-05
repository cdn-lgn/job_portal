import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
	registerCompany,
	getCompanyById,
	getCompany,
	updateCompany,
} from "../controllers/company.controller.js";
import { multerUpload } from "../middlewares/multerConfig.js";

const router = express.Router();

router
	.route("/register")
	.post(isAuthenticated, multerUpload.single("file"), registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;
