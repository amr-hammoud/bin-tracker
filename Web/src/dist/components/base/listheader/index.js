"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function ListHeader(props) {
    console.log("OLD ARRAY: ", props.items);
    const newArray = props.items.slice(0, props.items.length - 1);
    console.log("NEW ARRAY: ", newArray);
    return (react_1.default.createElement("div", { className: "flex justify-between content-center shadow border border-primary-300 rounded-md px-3 py-4 my-3\r\n                        hover:bg-primary-100 bg-primary-100 font-bold" },
        react_1.default.createElement("div", { className: "flex flex-grow justify-between gap-3" }, newArray.map((item, index) => {
            return (react_1.default.createElement("div", { className: "w-full px-3 truncate select-none", key: index },
                react_1.default.createElement("div", null, item)));
        })),
        react_1.default.createElement("div", { className: "flex gap-3" },
            react_1.default.createElement("div", null, props.items[props.items.length - 1]))));
}
exports.default = ListHeader;
