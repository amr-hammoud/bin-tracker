"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Navbar(props) {
    return (react_1.default.createElement("div", { className: 'px-5 py-3 font-semibold text-2xl text-neutral-0 bg-primary-500 w-full' }, props.label));
}
exports.default = Navbar;
