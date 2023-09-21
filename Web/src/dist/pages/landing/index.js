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
require("./style.css");
const react_router_dom_1 = require("react-router-dom");
const logo_landing_svg_1 = __importDefault(require("../../assets/logo/logo-landing.svg"));
const md_1 = require("react-icons/md");
const pi_1 = require("react-icons/pi");
function LandingPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [mobileNavbar, setMobileNavbar] = (0, react_1.useState)(true);
    return (react_1.default.createElement("div", { className: "scroll-smooth text-gunmetal" },
        react_1.default.createElement("div", { className: "hero-background h-screen w-screen" },
            react_1.default.createElement("div", { className: `flex justify-between sm:hidden px-8 py-4 bg-neutral-0 bg-opacity-90 ${mobileNavbar && "hidden"}` },
                react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center text-2xl\r\n                          hover:cursor-pointer hover:text-primary-500", onClick: () => setMobileNavbar(true) },
                    react_1.default.createElement(pi_1.PiListBold, null)),
                react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center w-24" },
                    react_1.default.createElement("img", { src: logo_landing_svg_1.default, alt: "logo" }))),
            react_1.default.createElement("div", { className: `flex flex-col fixed top-0 left-0 sm:hidden w-screen h-screen gap-10
                        px-16 py-4 bg-neutral-0 bg-opacity-90 justify-center content-center ${!mobileNavbar && "hidden"}` },
                react_1.default.createElement("div", { className: "flex justify-end text-xl " },
                    react_1.default.createElement("div", { className: "hover:cursor-pointer hover:text-primary-500", onClick: () => setMobileNavbar(false) },
                        react_1.default.createElement(md_1.MdClose, null))),
                react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center" },
                    react_1.default.createElement("img", { src: logo_landing_svg_1.default, alt: "logo" })),
                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center gap-5 w-full \r\n                      text-lg text-center" },
                    react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Home"),
                    react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Services"),
                    react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "About"),
                    react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Contact Us")),
                react_1.default.createElement("div", { className: "flex justify-center content-center" },
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap py-3 px-5 rounded-md font-semibold\r\n                                text-neutral-0 bg-primary-500 hover:bg-primary-700\r\n                                  hover:cursor-pointer", onClick: () => navigate("login") }, "Login"))),
            react_1.default.createElement("div", { className: "hidden sm:flex fixed top-0 left-0 w-screen px-16 py-4 bg-neutral-0 bg-opacity-90 " },
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
