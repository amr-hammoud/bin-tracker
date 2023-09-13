"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
function App() {
    return (react_1.default.createElement("div", { className: "container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10" },
        react_1.default.createElement("p", { className: "text-3xl text-gray-700 font-bold mb-5 font-poppins" }, "Welcome!"),
        react_1.default.createElement("p", { className: "text-gray-500 text-lg" }, "React and Tailwind CSS in action")));
}
exports.default = App;
