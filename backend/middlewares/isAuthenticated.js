import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		console.log("Token from Cookie:", token);
		if (!token) {
			return res.status(401).json({
				message: "user not authenticated",
				success: false,
			});
		}

		const decode = await jwt.verify(token, process.env.SECRET_KEY);
		if (!decode) {
			return res.status(401).json({
				message: "Invalid token",
				success: false,
			});
		}
		console.log("decoded id by jwt authentication==>> ", decode.userId);
		req.id = decode.userId;

		next();
	} catch (error) {
		console.log(error.message);
	}
};
