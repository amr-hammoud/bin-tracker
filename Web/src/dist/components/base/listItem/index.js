"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const md_1 = require("react-icons/md");
const ri_1 = require("react-icons/ri");
function ListItem(props) {
    const object = props.object;
    return (react_1.default.createElement("div", { className: "flex justify-between content-center shadow border border-primary-100 rounded-md px-3 py-4 my-3\r\n                        hover:bg-primary-100" },
        react_1.default.createElement("div", { className: "flex flex-grow justify-between gap-3" }, props.items.map((item, index) => {
            return (react_1.default.createElement("div", { className: "w-full px-3 truncate", key: index },
                react_1.default.createElement("div", null, item ? item : "-")));
        })),
        react_1.default.createElement("div", { className: "flex gap-3" },
            react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100", onClick: () => props.customIconAction_2 ? props.customIconAction_2(object) : "" }, props.customIcon_2),
            react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100", onClick: () => props.customIconAction ? props.customIconAction(object) : "" }, props.customIcon),
            props.onEdit ? (react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100", "data-custom": JSON.stringify(props.object ? props.object : ""), onClick: (e) => props.onEdit ? props.onEdit(e.currentTarget.getAttribute("data-custom")) : "" },
                react_1.default.createElement(md_1.MdOutlineEdit, null))) : (""),
            props.onDelete ? (react_1.default.createElement("div", { className: "flex flex-wrap justify-between content-center opacity-70\r\n                                hover:cursor-pointer hover:opacity-100", onClick: (e) => props.onDelete
                    ? props.onDelete(object._id)
                    : "" },
                react_1.default.createElement(ri_1.RiDeleteBin6Line, null))) : (""))));
}
exports.default = ListItem;
