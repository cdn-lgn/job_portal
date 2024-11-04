import express from "express";
import {
	logOut,
	login,
	register,
	updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { multerUpload } from "../middlewares/multerConfig.js";

const router = express.Router();

router.route("/register").post(multerUpload.single("file"), register);
router.route("/login").post(login);
router
	.route("/profile/update")
	.put(isAuthenticated, multerUpload.single("file"), updateProfile);
router.route("/logout").post(logOut);

export default router;
