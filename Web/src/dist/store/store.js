"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const persistConfig_1 = __importDefault(require("./persistConfig"));
const store = (0, toolkit_1.configureStore)({
    reducer: persistConfig_1.default,
});
exports.default = store;
