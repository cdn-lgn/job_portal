// In your store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthSliceReducer from "./authSlice";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, userAuthSliceReducer);

const store = configureStore({
	reducer: {
		user: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST"],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
