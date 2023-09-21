"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./style.css");
const react_router_dom_1 = require("react-router-dom");
const logo_landing_svg_1 = __importDefault(require("../../assets/logo/logo-landing.svg"));
function LandingPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement("div", { className: "scroll-smooth text-gunmetal" },
        react_1.default.createElement("div", { className: "hero-background h-screen w-screen" },
            react_1.default.createElement("div", { className: "flex fixed top-0 left-0 w-screen px-16 py-4 bg-neutral-0 bg-opacity-90 " },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("img", { src: logo_landing_svg_1.default, alt: "logo" })),
                react_1.default.createElement("div", { className: "flex w-full justify-center content-center gap-5\r\n                                text-lg" },
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Home"),
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Services"),
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "About"),
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Contact Us")),
                react_1.default.createElement("div", { className: "flex justify-center content-center" },
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap py-3 px-5 rounded-md font-semibold\r\n                                text-neutral-0 bg-primary-500 hover:bg-primary-700\r\n                                  hover:cursor-pointer", onClick: () => navigate("login") }, "Login"))))));
}
exports.default = LandingPage;
