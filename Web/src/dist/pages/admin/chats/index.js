"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const sidebar_1 = __importDefault(require("../../../components/common/sidebar"));
const navbar_1 = __importDefault(require("../../../components/common/navbar"));
function AdminChats() {
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    return (react_1.default.createElement("div", { className: "flex" },
        react_1.default.createElement(sidebar_1.default, { items: [
                "Dashboard",
                "Bins",
                "Map",
                "Users",
                "Trucks",
                "Announcements",
                "Chats",
                "Account",
            ], selected: "Chats" }),
        react_1.default.createElement("div", { className: `flex flex-col w-full ${collapse ? "ml-20" : "ml-64"}` },
            react_1.default.createElement(navbar_1.default, { label: "Chats" }),
            react_1.default.createElement("div", { className: "p-5" },
                react_1.default.createElement("h2", null,
                    "Hello ", user === null || user === void 0 ? void 0 :
                    user.first_name,
                    " ", user === null || user === void 0 ? void 0 :
                    user.last_name)))));
}
exports.default = AdminChats;
