"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Input(props) {
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 text-gunmetal" },
        react_1.default.createElement("div", { className: " text-sm flex content-center gap-1" },
            react_1.default.createElement("div", { className: " flex content-center flex-wrap text-primary-500" }, props.icon),
            react_1.default.createElement("div", { className: " flex content-center flex-wrap" }, props.label)),
        react_1.default.createElement("input", { type: props.type || "text", name: props.name, className: `peer/${props.name} rounded w-full text-base
                        bg-neutral-50 border-neutral-700
                        focus:ring-primary-500 focus:border-primary-500
                        focus:invalid:border-red-500 focus:invalid:ring-red-500  ${props.inputHeight ? props.inputHeight : " h-11"}`, placeholder: props.placeholder, onChange: (e) => props.onChange && props.onChange(e) }),
        react_1.default.createElement("div", { className: `mt-2 text-red-600 text-sm` }, props.error)));
}
exports.default = Input;
