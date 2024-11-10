import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
	try {
		// Extract the token from cookies
		const token = req.cookies.token;
		console.log("Token from Cookie:", req.cookies); // Check if the token is received

		// If no token found, respond with an authentication error
		if (!token) {
			return res.status(401).json({
				message: "User not authenticated",
				success: false,
			});
		}

		// Verify the token using JWT
		const decode = await jwt.verify(token, process.env.SECRET_KEY);
		if (!decode) {
			return res.status(401).json({
				message: "Invalid token",
				success: false,
			});
		}

		// Attach user ID to request object for further processing
		req.id = decode.userId;

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		console.log("Error during authentication:", error.message);
		res.status(500).json({
			message: "Authentication failed",
			success: false,
		});
	}
};
