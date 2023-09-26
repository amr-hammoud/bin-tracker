import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import sidebarSlice from "./sidebarSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const rootReducer = combineReducers({
	auth: authReducer,
	sidebar: sidebarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
