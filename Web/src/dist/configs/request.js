"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.baseURL = "http://localhost:8000/";
const sendRequest = (params) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(params);
    params.method = params.method || "GET";
    params.includeheaders = params.includeheaders || true;
    if (!params.route)
        throw Error("route required");
    const headers = params.includeheaders
        ? {
            Authorization: `Bearer ${params.token}`,
            "Content-Type": "application/json",
        }
        : {};
    try {
        const response = yield axios_1.default.request({
            method: params.method,
            url: params.route,
            data: params.body,
            headers,
        });
        return response;
    }
    catch (err) {
        throw err;
    }
});
exports.sendRequest = sendRequest;
