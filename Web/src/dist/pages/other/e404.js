"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Logo_full_svg_1 = __importDefault(require("../../assets/logo/Logo-full.svg"));
const button_1 = __importDefault(require("../../components/base/button"));
const react_router_dom_1 = require("react-router-dom");
function E401Page() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center h-screen bg-neutral-50 font-poppins text-gunmetal" },
        react_1.default.createElement("div", { className: "bg-neutral-0 p-10 rounded-md flex flex-wrap lg:flex-nowrap mx-10 max-w-md lg:max-w-none gap-5 drop-shadow-2xl" },
            react_1.default.createElement("div", { className: "w-full max-w-md flex flex-col flex-wrap gap-10" },
                react_1.default.createElement("img", { src: Logo_full_svg_1.default, alt: "" }),
                react_1.default.createElement("h1", { className: " text-center text-2xl font-semibold" }, "Sorry, the page you requested is not found!"),
                react_1.default.createElement(button_1.default, { label: "Go Back", onClick: () => navigate(-1) })))));
}
exports.default = E401Page;
