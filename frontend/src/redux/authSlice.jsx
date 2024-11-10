import { createSlice } from "@reduxjs/toolkit";

// User authentication slice
const authSlice = createSlice({
	name: "user",
	initialState: {
		user: null, // User information
		userAllApplications: null, // All user applications
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		resetUser: (action, state) => {
			state.user = null;
		},
		setUserAllApplications: (state, action) => {
			state.userAllApplications = action.payload;
		},
		resetUserAllApplications: (action, state) => {
			state.userAllApplications = null;
		},
	},
});

export const {
	setUser,
	resetUser,
	setUserAllApplications,
	resetUserAllApplications,
} = authSlice.actions;

export default authSlice.reducer;
