// Multer Configuration
import multer from "multer";

const multerUpload = multer({
	storage: multer.memoryStorage(), // Store the file in memory
	limits: { fileSize: 1024 * 1024 * 5 }, // Limit the file size to 5MB
});

export { multerUpload };
