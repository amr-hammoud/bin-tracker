"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const md_1 = require("react-icons/md");
const ri_1 = require("react-icons/ri");
const react_router_dom_1 = require("react-router-dom");
const iconMap = {
    Account: md_1.MdOutlineAccountCircle,
    Announcements: md_1.MdOutlineCampaign,
    Bins: ri_1.RiDeleteBin6Line,
    Chats: md_1.MdOutlineChat,
    Dashboard: md_1.MdOutlineSpaceDashboard,
    Groups: md_1.MdOutlineGroups2,
    Map: md_1.MdOutlineMap,
    Trucks: md_1.MdOutlineLocalShipping,
    Users: md_1.MdPersonOutline,
};
function SidebarItem(props) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const base_location = location.pathname.split("/")[1];
    const Icon = iconMap[props.label] || "";
    const clickHandler = () => {
        props.onSelected(props.label);
        navigate(base_location === "sadmin" || base_location === "admin"
            ? `/${base_location}/${props.label.toLowerCase()}`
            : `/${props.label.toLowerCase()}`, { replace: true });
    };
    return (react_1.default.createElement("div", { className: props.selected
            ? `flex content-center font-poppins
						my-2 gap-3 ${props.collapse ? "w-fit p-2" : "w-full py-2 pl-4 pr-10"} rounded-xl font-medium shadow-md
						text-neutral-0 bg-primary-500 hover:cursor-pointer`
            : `flex content-center font-poppins
						my-2 gap-3 ${props.collapse ? "w-fit p-2" : "w-full py-2 pl-4 pr-10"} rounded-xl font-medium text-gunmetal
						hover:bg-primary-200 hover:cursor-pointer`, onClick: () => clickHandler() },
        Icon ? (react_1.default.createElement("div", { className: ` flex content-center flex-wrap text-xl` },
            react_1.default.createElement(Icon, null),
            " ")) : (""),
        props.collapse ? ("") : (react_1.default.createElement("div", { className: " flex content-center flex-wrap" }, props.label))));
}
exports.default = SidebarItem;
