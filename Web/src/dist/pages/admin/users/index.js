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
const react_redux_1 = require("react-redux");
const sidebar_1 = __importDefault(require("../../../components/common/sidebar"));
const navbar_1 = __importDefault(require("../../../components/common/navbar"));
const request_1 = require("../../../configs/request");
const listItem_1 = __importDefault(require("../../../components/base/listItem"));
const listheader_1 = __importDefault(require("../../../components/base/listheader"));
const modal_1 = __importDefault(require("../../../components/base/modal"));
const button_1 = __importDefault(require("../../../components/base/button"));
const react_hot_toast_1 = require("react-hot-toast");
function AdminUsers() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const [userList, setUserList] = (0, react_1.useState)([]);
    const getUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "users/group",
                token,
            });
            if (response.status === 200) {
                setUserList(response.data);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getUsers();
    }, []);
    const [deleteModalState, setDeleteModalState] = (0, react_1.useState)({
        open: false,
        id: "",
    });
    const activateDeleteModal = (id) => {
        setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: true, id: id }));
    };
    const deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "DELETE",
                route: `users/${id}`,
                token,
            });
            if (response.status === 200) {
                const newArr = userList.filter((user) => {
                    return (user === null || user === void 0 ? void 0 : user._id) !== id;
                });
                setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
                react_hot_toast_1.toast.success("User Deleted Successfully", { duration: 2500 });
                setUserList(newArr);
            }
        }
        catch (err) {
            console.error(err);
            setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
            react_hot_toast_1.toast.error("Couldn't Delete User", { duration: 4000 });
        }
    });
    return (react_1.default.createElement("div", { className: "flex" },
        react_1.default.createElement(sidebar_1.default, { items: [
                "Dashboard",
                "Bins",
                "Map",
                "Users",
                "Trucks",
                "Announcements",
                "Chats",
                "Account",
            ], selected: "Users" }),
        react_1.default.createElement("div", { className: "flex flex-col w-full bg-neutral-0" },
            react_1.default.createElement(navbar_1.default, { label: "Users" }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement(modal_1.default, { showModal: deleteModalState.open, onRequestClose: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: !deleteModalState.open })) },
                react_1.default.createElement("div", { className: "text-xl" }, "Are you sure you want to delete?"),
                react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                    react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false })) }),
                    react_1.default.createElement(button_1.default, { label: "Delete", bgColor: "bg-red-400", hoverColor: "hover:bg-red-500", onClick: () => deleteUser(deleteModalState.id) }))),
            react_1.default.createElement("div", { className: "p-10 pt-3" },
                react_1.default.createElement(listheader_1.default, { items: ["Name", "Username", "Group", "Role", "Actions"] }),
                filterByRole(filterBySearch(userList, filters.searchQuery), filters.selectedFilter).map((user, key) => {
                    var _a;
                    let user_type = "";
                    if (user.user_type === "1") {
                        user_type = "Super Admin";
                    }
                    else if (user.user_type === "2") {
                        user_type = "Admin";
                    }
                    else if (user.user_type === "3") {
                        user_type = "Driver";
                    }
                    return (react_1.default.createElement(listItem_1.default, { items: [
                            `${user.first_name} ${user.last_name}`,
                            user.username,
                            (_a = user.group_id) === null || _a === void 0 ? void 0 : _a.name,
                            user_type,
                        ], object: user, onDelete: (id) => activateDeleteModal(id) }));
                })))));
}
exports.default = AdminUsers;
