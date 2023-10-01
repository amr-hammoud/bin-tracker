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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const sidebar_1 = __importDefault(require("../../../components/common/sidebar"));
const navbar_1 = __importDefault(require("../../../components/common/navbar"));
const react_hot_toast_1 = __importStar(require("react-hot-toast"));
const editarea_1 = __importDefault(require("../../../components/base/editarea"));
const profile_jpg_1 = __importDefault(require("../../../assets/images/profile.jpg"));
const md_1 = require("react-icons/md");
const button_1 = __importDefault(require("../../../components/base/button"));
const request_1 = require("../../../configs/request");
const authSlice_1 = require("../../../store/authSlice");
function SuperAdminAccount() {
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    const [disabledInputs, setDisabledInputs] = (0, react_1.useState)({
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        password: true,
        button: true,
    });
    const [profileDetails, setProfileDetails] = (0, react_1.useState)({
        _id: (user === null || user === void 0 ? void 0 : user._id) ? user === null || user === void 0 ? void 0 : user._id : "",
        first_name: (user === null || user === void 0 ? void 0 : user.first_name) ? user === null || user === void 0 ? void 0 : user.first_name : "",
        last_name: (user === null || user === void 0 ? void 0 : user.last_name) ? user === null || user === void 0 ? void 0 : user.last_name : "",
        email: (user === null || user === void 0 ? void 0 : user.email) ? user === null || user === void 0 ? void 0 : user.email : "",
        username: (user === null || user === void 0 ? void 0 : user.username) ? user === null || user === void 0 ? void 0 : user.username : "",
        password: "",
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    const getProfile = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: `users/${user === null || user === void 0 ? void 0 : user._id}`,
                token,
            });
            if (response.status === 200) {
                console.log(response);
                setProfileDetails(response.data);
                setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { first_name: true, last_name: true, email: true, username: true, password: true, button: true }));
                dispatch((0, authSlice_1.setUser)(response === null || response === void 0 ? void 0 : response.data));
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getProfile();
    }, []);
    const handleButtonAvailability = (key, value) => {
        const userValue = user ? user[key] : "";
        const isDisabled = value === userValue;
        setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { button: isDisabled }));
    };
    const [customUserType, setCustomUserType] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if ((user === null || user === void 0 ? void 0 : user.user_type) === "1") {
            setCustomUserType("Super Admin");
        }
        else if ((user === null || user === void 0 ? void 0 : user.user_type) === "2") {
            setCustomUserType("Admin");
        }
        else if ((user === null || user === void 0 ? void 0 : user.user_type) === "3") {
            setCustomUserType("Driver");
        }
    }, [user === null || user === void 0 ? void 0 : user.user_type]);
    const updateProfile = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = profileDetails, restData = __rest(profileDetails, ["_id"]);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "PUT",
                route: `users/profile`,
                body: restData,
                token,
            });
            if (response.status === 200) {
                react_hot_toast_1.default.success("Profile updated successfully", {
                    duration: 2500,
                });
                getProfile();
            }
            else {
                react_hot_toast_1.default.error("Couldn't Update, Try Again", { duration: 4000 });
            }
        }
        catch (err) {
            console.error(err);
            react_hot_toast_1.default.error("Couldn't Update, Try Again", { duration: 2500 });
        }
    });
    return (react_1.default.createElement("div", { className: "flex" },
        react_1.default.createElement(sidebar_1.default, { items: ["Dashboard", "Users", "Groups", "Account"], selected: "Account" }),
        react_1.default.createElement("div", { className: `flex flex-col w-full ${collapse ? "ml-20" : "ml-40"}` },
            react_1.default.createElement(navbar_1.default, { label: "Account" }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement("div", { className: "flex flex-col flex-wrap content-center justify-center py-20 px-3" },
                react_1.default.createElement("div", { className: "flex flex-wrap content-center gap-10" },
                    react_1.default.createElement("div", { className: "relative flex aspect-square w-48" },
                        react_1.default.createElement("img", { src: profile_jpg_1.default, className: "rounded-full", alt: "profile" }),
                        react_1.default.createElement("div", { className: "absolute bottom-2 right-2 p-3 text-2xl rounded-full\r\n\t\t\t\t\t\t\t\t\t\t\tbg-primary-500 text-neutral-0\r\n\t\t\t\t\t\t\t\t\t\t\thover:bg-primary-700 hover:cursor-pointer" },
                            react_1.default.createElement(md_1.MdOutlineEdit, null))),
                    react_1.default.createElement("div", { className: "flex flex-col justify-center gap-5 text-xl" },
                        react_1.default.createElement("div", null, `${user === null || user === void 0 ? void 0 : user.first_name} ${user === null || user === void 0 ? void 0 : user.last_name}`),
                        react_1.default.createElement("div", null,
                            "@", user === null || user === void 0 ? void 0 :
                            user.username),
                        react_1.default.createElement("div", null, customUserType))),
                react_1.default.createElement("hr", { className: "my-10" }),
                react_1.default.createElement("div", { className: "flex flex-col w-4/5 gap-6" },
                    react_1.default.createElement("div", { className: "flex flex-wrap md:flex-nowrap gap-5 w-full" },
                        react_1.default.createElement("div", { className: " w-full md:w-80" },
                            react_1.default.createElement(editarea_1.default, { label: "First Name", value: profileDetails.first_name, disabled: disabledInputs.first_name, enabler: () => {
                                    setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { first_name: false }));
                                }, onChange: (e) => {
                                    setProfileDetails(Object.assign(Object.assign({}, profileDetails), { first_name: e.target.value }));
                                    handleButtonAvailability("first_name", e.target.value);
                                } })),
                        react_1.default.createElement("div", { className: " w-full md:w-80" },
                            react_1.default.createElement(editarea_1.default, { label: "Last Name", disabled: disabledInputs.last_name, value: profileDetails.last_name, enabler: () => {
                                    setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { last_name: false }));
                                }, onChange: (e) => {
                                    setProfileDetails(Object.assign(Object.assign({}, profileDetails), { last_name: e.target.value }));
                                    handleButtonAvailability("last_name", e.target.value);
                                } })),
                        react_1.default.createElement("div", { className: " w-full md:w-80" },
                            react_1.default.createElement(editarea_1.default, { label: "Username", disabled: disabledInputs.username, value: profileDetails.username, enabler: () => {
                                    setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { username: false }));
                                }, onChange: (e) => {
                                    setProfileDetails(Object.assign(Object.assign({}, profileDetails), { username: e.target.value }));
                                    handleButtonAvailability("username", e.target.value);
                                } }))),
                    react_1.default.createElement("div", { className: "flex flex-wrap md:flex-nowrap gap-5 w-full" },
                        react_1.default.createElement("div", { className: " w-full md:w-80" },
                            react_1.default.createElement(editarea_1.default, { label: "Email", disabled: disabledInputs.email, value: profileDetails.email, enabler: () => {
                                    setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { email: false }));
                                }, onChange: (e) => {
                                    setProfileDetails(Object.assign(Object.assign({}, profileDetails), { email: e.target.value }));
                                    handleButtonAvailability("email", e.target.value);
                                } })),
                        react_1.default.createElement("div", { className: " w-full md:w-80" },
                            react_1.default.createElement(editarea_1.default, { label: "Password", disabled: disabledInputs.password, placeholder: "********", value: profileDetails.password, enabler: () => {
                                    setDisabledInputs(Object.assign(Object.assign({}, disabledInputs), { password: false }));
                                }, onChange: (e) => {
                                    setProfileDetails(Object.assign(Object.assign({}, profileDetails), { password: e.target.value }));
                                    handleButtonAvailability("password", e.target.value);
                                } }))),
                    react_1.default.createElement("div", { className: "flex justify-end content-center mt-8" },
                        react_1.default.createElement("div", { className: "flex content-center flex-wrap h-10 rounded-md font-semibold\r\n                                text-neutral-0", onClick: () => updateProfile() },
                            react_1.default.createElement(button_1.default, { label: "Save", disabled: disabledInputs.button }))))))));
}
exports.default = SuperAdminAccount;
