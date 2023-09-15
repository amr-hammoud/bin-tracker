"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// reduxPersistConfig.ts
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const redux_persist_1 = require("redux-persist");
const redux_1 = require("redux");
const authSlice_1 = __importDefault(require("./authSlice"));
const persistConfig = {
    key: "root",
    storage: storage_1.default,
    whitelist: ["auth"],
};
const rootReducer = (0, redux_1.combineReducers)({
    auth: authSlice_1.default,
});
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer);
exports.default = persistedReducer;
