"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const date_fns_1 = require("date-fns");
function MessageComponent(props) {
    const updatedAtDate = (0, date_fns_1.parseISO)(props.message.updatedAt);
    const formattedTime = (0, date_fns_1.format)(updatedAtDate, "hh:mm a");
    return (react_1.default.createElement("div", { className: `flex ${props.message.sender_id._id === props.user_id
            ? "justify-end animate__animated animate__slideInRight"
            : "justify-start animate__animated animate__slideInLeft"} w-full` },
        react_1.default.createElement("div", { className: "my-1 mx-1" },
            react_1.default.createElement("div", { className: "text-sm text-gunmetal mb-1" }, props.message.sender_id.username),
            react_1.default.createElement("div", { className: `flex text-sm p-2 rounded-md shadow-lg
                    ${props.message.sender_id._id === props.user_id
                    ? "bg-primary-400 text-neutral-0"
                    : "bg-neutral-0 text-gunmetal"} ` },
                react_1.default.createElement("div", null, props.message.content)),
            react_1.default.createElement("div", { className: "flex justify-end text-xs text-gunmetal mt-1" }, formattedTime))));
}
exports.default = MessageComponent;
