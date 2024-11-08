import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		userAllApplications: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		resetUser: (state, action) => {
			state.user = null;
		},
		setUserAllApplications: (state, action) => {
			state.userAllApplications = action.payload;
		},
		resetUserAllApplications: (state, action) => {
			state.userAllApplications = null;
		},
	},
});

export const {
	setUser,
	resetUser,
	setUserAllApplications,
	resetUserAllApplications,
} = userAuthSlice.actions;
export default userAuthSlice.reducer;
