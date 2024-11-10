import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/DBconnection.js";
import userRouter from "./routes/user.router.js";
import companyRouter from "./routes/company.router.js";
import jobRouter from "./routes/job.router.js";
import applicationRouter from "./routes/application.router.js";

dotenv.config({});

const app = express();
const corsOptions = {
	origin: process.env.FRONTEND_URL, // Colon ka dhyan rakhein
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true, // if you're using cookies/sessions
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

const PORT = 3000;
app.listen(PORT, async () => {
	await connectDB();
	console.log(`backend server started at port ${PORT}`);
});
