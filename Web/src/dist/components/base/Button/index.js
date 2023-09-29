"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Button(props) {
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-3 text-gunmetal" },
        react_1.default.createElement("button", { type: props.type || "button", name: props.name, disabled: props.disabled, className: `peer/${props.name} rounded h-10 w-full px-5 text-base
				${props.bgColor ? props.bgColor : "bg-primary-500"} ${props.color ? props.color : "text-neutral-0"}
				font-medium ${props.hoverColor ? props.hoverColor : "hover:bg-primary-700"}
				disabled:bg-primary-300`, onClick: props.onClick }, props.label)));
}
exports.default = Button;
