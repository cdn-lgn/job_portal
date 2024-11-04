import axios from "axios";

const USER_URI = import.meta.env.VITE_USER_URI;

export const registerUser = async (userData) => {
	await axios.post(`${USER_URI}/register`, registerUser, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
