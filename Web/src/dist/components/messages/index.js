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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const date_fns_1 = require("date-fns");
const user_default_svg_1 = __importDefault(require("../../assets/icons/user-default.svg"));
function MessageComponent(props) {
    var _a, _b, _c, _d;
    const updatedAtDate = (0, date_fns_1.parseISO)(props.message.updatedAt);
    const formattedTime = (0, date_fns_1.format)(updatedAtDate, "hh:mm a");
    const [isSender, setIsSender] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (isSender) {
            setIsSender(true);
        }
        else {
            setIsSender(false);
        }
    }, [props.message]);
    return (react_1.default.createElement("div", { className: `flex ${isSender
            ? "justify-end animate__animated animate__slideInRight"
            : "justify-start animate__animated animate__slideInLeft"} w-full` },
        react_1.default.createElement("div", { className: `flex ${isSender
                ? "flex-row-reverse"
                : ""} m-1` },
            react_1.default.createElement("div", { className: `flex flex-wrap justify-center content-center ${isSender
                    ? "border-l-2 pl-2 ml-4"
                    : "border-r-2 pr-2 mr-4"} border-neutral-600` },
                react_1.default.createElement("img", { className: "w-10 h-10 aspect-square object-cover rounded-full", src: ((_b = (_a = props.message) === null || _a === void 0 ? void 0 : _a.sender_id) === null || _b === void 0 ? void 0 : _b.image) ? (_d = (_c = props.message) === null || _c === void 0 ? void 0 : _c.sender_id) === null || _d === void 0 ? void 0 : _d.image : user_default_svg_1.default, alt: "" })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "text-sm text-gunmetal mb-1" }, props.message.sender_id.username),
                react_1.default.createElement("div", { className: `flex text-sm p-2 rounded-md shadow-lg
                    ${isSender
                        ? "bg-primary-400 text-neutral-0"
                        : "bg-neutral-0 text-gunmetal"} ` },
                    react_1.default.createElement("div", null, props.message.content)),
                react_1.default.createElement("div", { className: "flex justify-end text-xs text-gunmetal mt-1" }, formattedTime)))));
}
exports.default = MessageComponent;
