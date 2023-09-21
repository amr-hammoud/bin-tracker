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
require("./style.css");
const md_1 = require("react-icons/md");
const pi_1 = require("react-icons/pi");
const react_router_dom_1 = require("react-router-dom");
const about_section_svg_1 = __importDefault(require("../../assets/images/about-section.svg"));
const app_png_1 = __importDefault(require("../../assets/images/app.png"));
const bins_png_1 = __importDefault(require("../../assets/images/bins.png"));
const dashboard_png_1 = __importDefault(require("../../assets/images/dashboard.png"));
const input_1 = __importDefault(require("../../components/base/input"));
const logo_landing_svg_1 = __importDefault(require("../../assets/logo/logo-landing.svg"));
const react_1 = __importStar(require("react"));
function LandingPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [mobileNavbar, setMobileNavbar] = (0, react_1.useState)(true);
    const [contactForm, setContactForm] = (0, react_1.useState)({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        company: "",
        location: "",
        inquiry: "",
    });
    return (react_1.default.createElement("div", { className: "text-gunmetal" },
        react_1.default.createElement("div", { className: `flex justify-between sm:hidden fixed top-0 left-0 w-screen shadow-md px-8 py-4 bg-neutral-0 bg-opacity-90 z-20 ${mobileNavbar ? "hidden" : ""}` },
            react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center w-24" },
                react_1.default.createElement("img", { src: logo_landing_svg_1.default, alt: "logo" })),
            react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center text-2xl\r\n                          \t\t\thover:cursor-pointer hover:text-primary-500", onClick: () => setMobileNavbar(true) },
                react_1.default.createElement(pi_1.PiListBold, null))),
        react_1.default.createElement("div", { className: `flex flex-col fixed top-0 left-0 sm:hidden w-screen h-screen gap-10
                        px-16 py-4 bg-neutral-0 bg-opacity-90 justify-center content-center z-20 ${!mobileNavbar ? "hidden" : ""}` },
            react_1.default.createElement("div", { className: "flex justify-end text-xl " },
                react_1.default.createElement("div", { className: "hover:cursor-pointer hover:text-primary-500", onClick: () => setMobileNavbar(false) },
                    react_1.default.createElement(md_1.MdClose, null))),
            react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center" },
                react_1.default.createElement("img", { src: logo_landing_svg_1.default, alt: "logo" })),
            react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center gap-5 w-full \r\n                      text-lg text-center" },
                react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#home" }, "Home")),
                react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#services" }, "Services")),
                react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#about" }, "About")),
                react_1.default.createElement("div", { className: "flex justify-center content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" }, "Contact Us")),
            react_1.default.createElement("div", { className: "flex justify-center content-center" },
                react_1.default.createElement("div", { className: "flex content-center flex-wrap py-3 px-5 rounded-md font-semibold\r\n                                text-neutral-0 bg-primary-500 hover:bg-primary-700\r\n                                  hover:cursor-pointer", onClick: () => navigate("login") }, "Login"))),
        react_1.default.createElement("div", { className: "hidden sm:flex fixed top-0 left-0 w-screen px-16 py-4 shadow-md bg-neutral-0 bg-opacity-90 z-20" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("img", { src: logo_landing_svg_1.default, alt: "logo" })),
            react_1.default.createElement("div", { className: "flex w-full justify-center content-center gap-5\r\n                                text-lg" },
                react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#home" }, "Home")),
                react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#services" }, "Services")),
                react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#about" }, "About")),
                react_1.default.createElement("div", { className: "flex content-center flex-wrap font-medium\r\n                                hover:text-primary-500 hover:cursor-pointer" },
                    react_1.default.createElement("a", { href: "#contact" }, "Contact us"))),
            react_1.default.createElement("div", { className: "flex justify-center content-center" },
                react_1.default.createElement("div", { className: "flex content-center flex-wrap py-3 px-5 rounded-md font-semibold\r\n                                text-neutral-0 bg-primary-500 hover:bg-primary-700\r\n                                  hover:cursor-pointer", onClick: () => navigate("login") }, "Login"))),
        react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center hero-background h-screen w-screen text-center", id: "home" },
            react_1.default.createElement("div", { className: "black-overlay absolute opacity-60 bg-neutral-900 w-screen h-screen" }),
            react_1.default.createElement("div", { className: "flex flex-col gap-6 z-10" },
                react_1.default.createElement("div", { className: "text-primary-500 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold" }, "Bin Tracker"),
                react_1.default.createElement("div", { className: "text-neutral-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold" },
                    "The Optimal Solution for ",
                    react_1.default.createElement("br", null),
                    "Smart Waste Management"),
                react_1.default.createElement("div", { className: "flex justify-center content-center" },
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap px-5 md:px-7 py-2 lg:py-3 lg:px-10 rounded-md font-semibold\r\n                                text-neutral-0 bg-primary-500 hover:bg-primary-700\r\n                                  hover:cursor-pointer" }, "Get Started")))),
        react_1.default.createElement("div", { className: "flex flex-wrap justify-center content-center w-full bg-neutral-100", id: "services" },
            react_1.default.createElement("div", { className: "flex flex-col w-4/5 my-28 gap-6" },
                react_1.default.createElement("div", { className: " text-4xl font-bold text-primary-500" }, "Services"),
                react_1.default.createElement("div", { className: "text-2xl font-medium" }, "A leading smart waste management system"),
                react_1.default.createElement("div", { className: " text-xl text-[#555555]" }, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, placeat nulla magnam iure autem earum iusto incidunt nihil veritatis pariatur perspiciatis porro commodi perferendis sit iste blanditiis, eius corporis fuga!"),
                react_1.default.createElement("div", { className: "flex flex-wrap lg:flex-nowrap justify-center md:justify-center lg:justify-between gap-10" },
                    react_1.default.createElement("div", { className: "flex flex-col gap-2 bg-neutral-0 shadow-lg rounded-xl w-full lg:w-1/3" },
                        react_1.default.createElement("img", { src: bins_png_1.default, alt: "smart bins" }),
                        react_1.default.createElement("div", { className: "flex flex-col w-full gap-1 px-5 py-3 pb-7 rounded-xl" },
                            react_1.default.createElement("div", { className: "font-semibold text-xl" }, "Smart Bins"),
                            react_1.default.createElement("div", { className: "font-medium" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, iusto ex? Sequi placeat amet doloremque obcaecati facere eum tenetur distinctio!"))),
                    react_1.default.createElement("div", { className: "flex flex-col gap-2 bg-neutral-0 shadow-lg rounded-xl w-full lg:w-1/3" },
                        react_1.default.createElement("img", { src: dashboard_png_1.default, alt: "dashboard" }),
                        react_1.default.createElement("div", { className: "flex flex-col w-full gap-1 px-5 py-3 pb-7 rounded-xl" },
                            react_1.default.createElement("div", { className: "font-semibold text-xl" }, "Customized Dashboard"),
                            react_1.default.createElement("div", { className: "font-medium" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, iusto ex? Sequi placeat amet doloremque obcaecati facere eum tenetur distinctio!"))),
                    react_1.default.createElement("div", { className: "flex flex-col gap-2 bg-neutral-0 shadow-lg rounded-xl w-full lg:w-1/3" },
                        react_1.default.createElement("img", { src: app_png_1.default, alt: "app" }),
                        react_1.default.createElement("div", { className: "flex flex-col w-full gap-1 px-5 py-3 pb-7 rounded-xl" },
                            react_1.default.createElement("div", { className: "font-semibold text-xl" }, "Mobile App"),
                            react_1.default.createElement("div", { className: "font-medium" }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, iusto ex? Sequi placeat amet doloremque obcaecati facere eum tenetur distinctio!")))))),
        react_1.default.createElement("div", { className: "about-section relative flex flex-wrap justify-center w-full bg-neutral-0", id: "about" },
            react_1.default.createElement("div", { className: "flex flex-col w-4/5 my-28 gap-10" },
                react_1.default.createElement("div", { className: " text-4xl font-bold text-primary-500" }, "About"),
                react_1.default.createElement("div", { className: "text-2xl font-medium" }, "A leading smart waste management system"),
                react_1.default.createElement("div", { className: " text-xl" }, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, placeat nulla magnam iure autem earum iusto incidunt nihil veritatis pariatur perspiciatis porro commodi perferendis sit iste blanditiis, eius corporis fuga!"),
                react_1.default.createElement("div", { className: "flex gap-10" },
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center text-9xl w-44 font-bold text-primary-500" }, "01"),
                    react_1.default.createElement("div", { className: " w-2/5 text-xl text-justify" }, "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.")),
                react_1.default.createElement("div", { className: "flex gap-10" },
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center text-9xl w-44 font-bold text-primary-500" }, "02"),
                    react_1.default.createElement("div", { className: " w-2/5 text-xl text-justify" }, "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."))),
            react_1.default.createElement("div", { className: "about-section-image-mobile flex justify-end md:hidden h-fit w-full" },
                react_1.default.createElement("img", { src: about_section_svg_1.default, alt: "garbage truck track" })),
            react_1.default.createElement("div", { className: "about-section-image hidden md:block absolute bottom-0 right-0 h-fit w-full" },
                react_1.default.createElement("img", { src: about_section_svg_1.default, alt: "garbage truck track" }))),
        react_1.default.createElement("div", { className: "z-10 relative flex flex-wrap justify-center content-center w-full bg-neutral-100", id: "contact" },
            react_1.default.createElement("div", { className: "flex flex-col w-4/5 my-28 gap-6" },
                react_1.default.createElement("div", { className: " text-4xl font-bold text-primary-500" }, "Contact us"),
                react_1.default.createElement("div", { className: "flex flex-wrap md:flex-nowrap gap-5 w-full" },
                    react_1.default.createElement("div", { className: " w-full md:w-1/3" },
                        react_1.default.createElement(input_1.default, { label: "First Name", placeholder: "first name", required: true, onChange: (e) => {
                                setContactForm(Object.assign(Object.assign({}, contactForm), { first_name: e.target.value }));
                            } })),
                    react_1.default.createElement("div", { className: " w-full md:w-1/3" },
                        react_1.default.createElement(input_1.default, { label: "Last Name", placeholder: "surname", required: true, onChange: (e) => {
                                setContactForm(Object.assign(Object.assign({}, contactForm), { last_name: e.target.value }));
                            } })),
                    react_1.default.createElement("div", { className: " w-full md:w-1/3" },
                        react_1.default.createElement(input_1.default, { label: "Phone Number", type: "tel", placeholder: "number", required: true, onChange: (e) => {
                                setContactForm(Object.assign(Object.assign({}, contactForm), { phone_number: e.target.value }));
                            } }))),
                react_1.default.createElement("div", { className: "flex flex-wrap md:flex-nowrap gap-5 w-full" },
                    react_1.default.createElement("div", { className: " w-full md:w-1/3" },
                        react_1.default.createElement(input_1.default, { label: "Email", placeholder: "example@email.com", required: true, onChange: (e) => {
                                setContactForm(Object.assign(Object.assign({}, contactForm), { email: e.target.value }));
                            } })),
                    react_1.default.createElement("div", { className: " w-full md:w-1/3" },
                        react_1.default.createElement(input_1.default, { label: "Company", placeholder: "company name", required: true, onChange: (e) => {
                                setContactForm(Object.assign(Object.assign({}, contactForm), { company: e.target.value }));
                            } })),
                    react_1.default.createElement("div", { className: " w-full md:w-1/3" },
                        react_1.default.createElement(input_1.default, { label: "Location", placeholder: "City, Country", required: true, onChange: (e) => {
                                setContactForm(Object.assign(Object.assign({}, contactForm), { location: e.target.value }));
                            } }))),
                react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 text-gunmetal" },
                    react_1.default.createElement("div", { className: " text-sm flex content-center gap-1" },
                        react_1.default.createElement("div", { className: " flex content-center flex-wrap" },
                            "Inquiry",
                            react_1.default.createElement("span", { className: " text-red-500" }, "*"))),
                    react_1.default.createElement("textarea", { className: `rounded w-full text-base
									bg-neutral-50 border-neutral-700
									focus:ring-primary-500 focus:border-primary-500`, cols: 30, rows: 10, placeholder: "How can we help you?", onChange: (e) => {
                            setContactForm(Object.assign(Object.assign({}, contactForm), { inquiry: e.target.value }));
                        } })),
                react_1.default.createElement("div", { className: "flex justify-end content-center mt-8" },
                    react_1.default.createElement("div", { className: "flex content-center flex-wrap px-5 md:px-7 py-2 lg:py-3 lg:px-10 rounded-md font-semibold\r\n                                text-neutral-0 bg-primary-500 hover:bg-primary-700\r\n                                  hover:cursor-pointer" }, "Submit"))))));
}
exports.default = LandingPage;
