"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Select(props) {
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 w-full text-gunmetal" },
        react_1.default.createElement("div", { className: " text-sm flex content-center gap-1 cursor-default select-none" },
            react_1.default.createElement("div", { className: " flex content-center flex-wrap" },
                props.label,
                props.required ? (react_1.default.createElement("span", { className: " text-red-500" }, "*")) : (""))),
        react_1.default.createElement("select", { className: "font-poppins w-full bg-neutral-50 border-neutral-700 rounded text-base text-gunmetal\r\n\t\t\t\t\t\t\thover:cursor-pointer focus:ring-primary-500 focus:border-primary-500", value: props.value, disabled: props.disabled, onChange: (e) => props.onChange(e) }, Object.entries(props.options).map(([key, value], index) => {
            return react_1.default.createElement("option", { value: value, key: index }, key);
        }))));
}
exports.default = Select;
