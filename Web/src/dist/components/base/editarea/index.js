"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const md_1 = require("react-icons/md");
function EditArea(props) {
    const input = (0, react_1.useRef)(null);
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 w-full text-gunmetal" },
        react_1.default.createElement("div", { className: " text-sm flex content-center gap-1 cursor-default select-none" },
            react_1.default.createElement("div", { className: " flex content-center flex-wrap text-primary-500" }, props.icon),
            react_1.default.createElement("div", { className: " flex content-center flex-wrap" },
                props.label,
                props.required ? (react_1.default.createElement("span", { className: " text-red-500" }, "*")) : (""))),
        react_1.default.createElement("div", { className: "relative h-fit w-full" },
            react_1.default.createElement("input", { type: props.type || "text", name: props.name, className: `peer/${props.name} rounded w-full text-base
                        bg-neutral-50 border-neutral-700
						placeholder:text-neutral-700 placeholder:text-base
                        disabled:text-neutral-700
                        focus:ring-primary-500 focus:border-primary-500
                        focus:invalid:border-red-500 focus:invalid:ring-red-500  ${props.inputHeight ? props.inputHeight : " h-11"}`, ref: input, disabled: props.disabled, placeholder: props.placeholder, value: props.value ? props.value : null, onChange: (e) => props.onChange && props.onChange(e) }),
            react_1.default.createElement("div", { className: "absolute bottom-4 right-4 opacity-70\r\n\t\t\t\t\t\t\t\thover:cursor-pointer hover:opacity-100", onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield props.enabler();
                    input.current ? input.current.focus() : console.log("");
                }) },
                react_1.default.createElement(md_1.MdOutlineEdit, null))),
        props.error ? (react_1.default.createElement("div", { className: `mt-2 text-red-600 text-sm` }, props.error)) : ("")));
}
exports.default = EditArea;
