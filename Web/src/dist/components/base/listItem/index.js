"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const md_1 = require("react-icons/md");
const ri_1 = require("react-icons/ri");
function ListItem(props) {
    const AdditionalIcon = props.customIcon;
    return (react_1.default.createElement("div", { className: "flex justify-between content-center shadow border border-primary-300 rounded-md px-3 py-4 my-3\r\n                        hover:bg-primary-100" },
        react_1.default.createElement("div", { className: "flex flex-grow justify-between gap-3" }, props.items.map((item, index) => {
            return (react_1.default.createElement("div", { className: "w-full px-3 truncate select-none", key: index },
                react_1.default.createElement("div", null, item)));
        })),
        react_1.default.createElement("div", { className: "flex gap-3" },
            react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100", onClick: () => props.customIconAction ? props.customIconAction() : "" }, AdditionalIcon),
            react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100" },
                react_1.default.createElement(md_1.MdOutlineEdit, null)),
            react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100" },
                react_1.default.createElement(ri_1.RiDeleteBin6Line, null)))));
}
exports.default = ListItem;
