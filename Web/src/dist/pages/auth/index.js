"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_1 = __importDefault(require("../../components/base/Input"));
const md_1 = require("react-icons/md");
const ri_1 = require("react-icons/ri");
const Logo_full_svg_1 = __importDefault(require("../../assets/logo/Logo-full.svg"));
const auth_image_jpg_1 = __importDefault(require("../../assets/images/auth-image.jpg"));
const Button_1 = __importDefault(require("../../components/base/Button"));
function AuthPage() {
    const Login = () => {
        console.log("aa");
    };
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center h-screen bg-neutral-50 font-poppins text-gunmetal" },
        react_1.default.createElement("div", { className: "bg-neutral-0 p-10 rounded-md flex flex-wrap lg:flex-nowrap mx-10 max-w-md lg:max-w-none gap-5 drop-shadow-2xl" },
            react_1.default.createElement("div", { className: "w-full max-w-sm flex flex-col flex-wrap gap-8" },
                react_1.default.createElement("img", { src: Logo_full_svg_1.default, alt: "" }),
                react_1.default.createElement("h1", { className: " text-center text-4xl font-bold" }, "Login"),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(Input_1.default, { type: "email", label: "Email", name: "email", icon: react_1.default.createElement(md_1.MdAlternateEmail, null), error: "Input a valid email address" }),
                    react_1.default.createElement(Input_1.default, { type: "password", label: "Password", name: "password", icon: react_1.default.createElement(ri_1.RiLockPasswordFill, null) }),
                    react_1.default.createElement(Button_1.default, { type: "submit", label: "Login", onClick: Login }))),
            react_1.default.createElement("div", { className: "flex flex-wrap content-center w-0 lg:w-full" },
                react_1.default.createElement("img", { src: auth_image_jpg_1.default, alt: "" })))));
}
exports.default = AuthPage;
