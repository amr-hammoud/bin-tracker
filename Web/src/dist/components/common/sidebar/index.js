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
const Logo_collapse_svg_1 = __importDefault(require("../../../assets/logo/Logo-collapse.svg"));
const lu_1 = require("react-icons/lu");
const bi_1 = require("react-icons/bi");
const react_redux_1 = require("react-redux");
const authSlice_1 = require("../../../store/authSlice");
const react_router_dom_1 = require("react-router-dom");
const sidebarSlice_1 = require("../../../store/sidebarSlice");
function Sidebar(props) {
    var _a;
    const [selectedTab, setSelectedTab] = (0, react_1.useState)(props.selected);
    const selectHandler = (label) => {
        setSelectedTab(label);
    };
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogout = () => {
        dispatch((0, authSlice_1.setToken)(null));
        dispatch((0, authSlice_1.setUser)(null));
        navigate("/", { replace: true });
    };
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    return (react_1.default.createElement("div", { className: "flex flex-col flex-wrap fixed shadow-md bg-neutral-50 h-screen w-fit p-4 z-50 select-none" },
        react_1.default.createElement("div", { className: "flex justify-center w-fill mt-2 mb-8 text-xl rounded-md p-2\r\n\t\t\t\t\t\t\thover:bg-primary-400 hover:text-neutral-0 hover:cursor-pointer", onClick: () => dispatch((0, sidebarSlice_1.setCollapse)(!collapse)) },
            react_1.default.createElement(lu_1.LuMenu, null)),
        react_1.default.createElement("div", { className: "w-full flex justify-center" }, collapse ? (react_1.default.createElement("img", { src: Logo_collapse_svg_1.default, className: " w-2/3", alt: "logo" })) : (react_1.default.createElement("img", { src: Logo_full_svg_1.default, className: "w-32", alt: "logo" }))),
        react_1.default.createElement("div", { className: `mt-8 ${collapse ? "flex flex-col flex-wrap justify-center content-center" : ""}` }, (_a = props.items) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
            return (react_1.default.createElement(sidebarItem_1.default, { key: index, collapse: collapse, label: item, selected: selectedTab === item, onSelected: (label) => selectHandler(label) }));
        })),
        react_1.default.createElement("div", { className: `flex flex-wrap content-center ${collapse ? "justify-center w-full" : ""}  font-poppins
				mt-12 gap-3 p-2 rounded-xl font-medium text-gunmetal
				hover:bg-red-200 hover:cursor-pointer`, onClick: () => handleLogout() },
            react_1.default.createElement("div", { className: " flex content-center flex-wrap" },
                react_1.default.createElement(bi_1.BiLogOut, null)),
            collapse ? ("") : (react_1.default.createElement("div", { className: " flex content-center flex-wrap" }, "Logout")))));
}
exports.default = Sidebar;
