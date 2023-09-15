"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
function SuperAdminAccount() {
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Admin Account"),
        react_1.default.createElement("h2", null,
            "Hello ", user === null || user === void 0 ? void 0 :
            user.first_name,
            " ", user === null || user === void 0 ? void 0 :
            user.last_name)));
}
exports.default = SuperAdminAccount;
