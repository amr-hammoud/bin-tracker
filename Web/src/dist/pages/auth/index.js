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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Input_1 = __importDefault(require("../../components/base/Input"));
const md_1 = require("react-icons/md");
const ri_1 = require("react-icons/ri");
const Logo_full_svg_1 = __importDefault(require("../../assets/logo/Logo-full.svg"));
const auth_image_jpg_1 = __importDefault(require("../../assets/images/auth-image.jpg"));
const Button_1 = __importDefault(require("../../components/base/Button"));
const request_1 = require("../../configs/request");
const react_redux_1 = require("react-redux");
const authSlice_1 = require("../../store/authSlice");
const react_router_dom_1 = require("react-router-dom");
function AuthPage() {
    const [authInfo, setAuthInfo] = (0, react_1.useState)({
        email: "",
        username: "",
        password: "",
        login_error: "",
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const Login = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: "auth/login",
                body: JSON.stringify(authInfo),
            });
            console.log(response);
            if (response.status === 200) {
                dispatch((0, authSlice_1.setToken)((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.token));
                dispatch((0, authSlice_1.setUser)((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.user));
                if (response.data.user.user_type === "1") {
                    navigate("/admin/dashboard");
                }
                else if (response.data.user.user_type === "2") {
                    navigate("/dashboard");
                }
            }
        }
        catch (err) {
            console.error(err);
            setAuthInfo(Object.assign(Object.assign({}, authInfo), { login_error: err.response.data.message }));
        }
    });
    const handleIdentifierChange = (e) => {
        if (e.search("@") !== -1) {
            setAuthInfo(Object.assign(Object.assign({}, authInfo), { email: e, username: "" }));
        }
        else {
            setAuthInfo(Object.assign(Object.assign({}, authInfo), { username: e, email: "" }));
        }
    };
    const handlePasswordChange = (e) => {
        setAuthInfo(Object.assign(Object.assign({}, authInfo), { password: e }));
    };
    return (react_1.default.createElement("div", { className: "flex flex-wrap flex-col justify-center content-center h-screen bg-neutral-50 font-poppins text-gunmetal" },
        react_1.default.createElement("div", { className: "bg-neutral-0 p-10 rounded-md flex flex-wrap lg:flex-nowrap mx-10 max-w-md lg:max-w-none gap-5 drop-shadow-2xl" },
            react_1.default.createElement("div", { className: "w-full max-w-sm flex flex-col flex-wrap gap-8" },
                react_1.default.createElement("img", { src: Logo_full_svg_1.default, alt: "" }),
                react_1.default.createElement("h1", { className: " text-center text-4xl font-bold" }, "Login"),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(Input_1.default, { type: "text", label: "Email / Username", name: "identifier", icon: react_1.default.createElement(md_1.MdAlternateEmail, null), onChange: (e) => handleIdentifierChange(e.target.value) }),
                    react_1.default.createElement(Input_1.default, { type: "password", label: "Password", name: "password", error: authInfo.login_error, icon: react_1.default.createElement(ri_1.RiLockPasswordFill, null), onChange: (e) => handlePasswordChange(e.target.value) }),
                    react_1.default.createElement(Button_1.default, { type: "submit", label: "Login", onClick: Login }))),
            react_1.default.createElement("div", { className: "flex flex-wrap content-center w-0 lg:w-full" },
                react_1.default.createElement("img", { src: auth_image_jpg_1.default, alt: "" })))));
}
exports.default = AuthPage;
