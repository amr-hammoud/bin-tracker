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
const sidebarItem_1 = __importDefault(require("../../base/sidebarItem"));
const Logo_full_svg_1 = __importDefault(require("../../../assets/logo/Logo-full.svg"));
const bi_1 = require("react-icons/bi");
function Sidebar(props) {
    var _a;
    const [selectedTab, setSelectedTab] = (0, react_1.useState)(props.selected);
    const selectHandler = (label) => {
        setSelectedTab(label);
    };
    return (react_1.default.createElement("div", { className: "flex flex-col flex-wrap shadow-md bg-neutral-50 h-screen w-64 p-4" },
        react_1.default.createElement("div", { className: "w-full flex justify-center" },
            react_1.default.createElement("img", { src: Logo_full_svg_1.default, className: "w-32", alt: "logo" })),
        react_1.default.createElement("div", { className: " mt-8" }, (_a = props.items) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
            return (react_1.default.createElement(sidebarItem_1.default, { key: index, label: item, selected: selectedTab === item, onSelected: (label) => selectHandler(label) }));
        })),
        react_1.default.createElement("div", { className: "flex flex-wrap content-center font-poppins\r\n\t\t\t\tmt-12 gap-3 w-full p-2 rounded-xl font-medium text-gunmetal\r\n\t\t\t\thover:bg-red-200 hover:cursor-pointer" },
            react_1.default.createElement("div", { className: " flex content-center flex-wrap" },
                react_1.default.createElement(bi_1.BiLogOut, null)),
            react_1.default.createElement("div", { className: " flex content-center flex-wrap" }, "Logout"))));
}
exports.default = Sidebar;
