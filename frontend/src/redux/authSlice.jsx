import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		resetUser: (state, action) => {
			state.user = null;
		},
	},
});

export const { setUser, resetUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
