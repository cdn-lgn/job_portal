import { configureStore } from "@reduxjs/toolkit";
import userAuthSliceReducer from "./authSlice"; // Import slice reducer
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage

// Persist configuration for redux-persist
const persistConfig = {
	key: "root", // Root key for persisted state
	storage, // Storage type (localStorage)
};

// Wrap the user auth reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userAuthSliceReducer);

// Configure Redux store
const store = configureStore({
	reducer: {
		user: persistedReducer, // Attach persisted reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST"], // Ignore actions specific to redux-persist
			},
		}),
});

// Persistor for managing store persistence
const persistor = persistStore(store);

export { store, persistor };
