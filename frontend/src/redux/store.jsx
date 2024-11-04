import { configureStore } from "@reduxjs/toolkit";
import userAuthSliceReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
	key: "root",
	storage,
};

// Persist the user auth reducer
const persistedReducer = persistReducer(persistConfig, userAuthSliceReducer);

// Create the Redux store
const store = configureStore({
	reducer: {
		user: persistedReducer,
	},
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
