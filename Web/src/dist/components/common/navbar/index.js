"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Navbar(props) {
    return (react_1.default.createElement("div", { className: "sticky top-0 left-0 flex justify-between px-5 py-3 font-semibold text-2xl text-neutral-0 bg-primary-500 w-full select-none" },
        props.label,
        props.buttonAction ?
            react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center py-1 px-2\r\n                            rounded text-base shadow-md bg-neutral-0 text-primary-500\r\n\t\t\t\t\t\t\thover:cursor-pointer hover:bg-neutral-100", onClick: () => props.buttonAction ? props.buttonAction() : "" }, props.buttonLabel) : ""));
}
exports.default = Navbar;
