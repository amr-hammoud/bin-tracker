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
const request_1 = require("../../../configs/request");
const listItem_1 = __importDefault(require("../../../components/base/listItem"));
const listheader_1 = __importDefault(require("../../../components/base/listheader"));
const modal_1 = __importDefault(require("../../../components/base/modal"));
const button_1 = __importDefault(require("../../../components/base/button"));
const input_1 = __importDefault(require("../../../components/base/input"));
const react_hot_toast_1 = require("react-hot-toast");
const select_1 = __importDefault(require("../../../components/base/select"));
function SuperAdminUsers() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const [userList, setUserList] = (0, react_1.useState)([]);
    const getUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "users/",
                token,
            });
            if (response.status === 200) {
                const usersFilteredList = response.data.filter((userItem) => userItem._id !== (user === null || user === void 0 ? void 0 : user._id));
                setUserList(usersFilteredList);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getUsers();
        getGroups();
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
    const [createModalState, setCreateModalState] = (0, react_1.useState)({
        open: false,
        type: "create",
    });
    const [userData, setUserData] = (0, react_1.useState)({
        _id: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        user_type: "",
        group_id: "",
    });
    const activateCreateModal = () => {
        setUserData(Object.assign(Object.assign({}, userData), { _id: "", first_name: "", last_name: "", username: "", email: "", password: "", group_id: "", user_type: "1" }));
        setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: true, type: "create" }));
    };
    const activateEditModal = (data) => {
        const user = JSON.parse(data);
        setUserData(Object.assign(Object.assign({}, userData), { _id: user._id, first_name: user.first_name, last_name: user.last_name, username: user.username, email: user.email, group_id: user.group_id, user_type: user.user_type }));
        setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: true, type: "edit" }));
    };
    const updateUser = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = userData, restData = __rest(userData, ["_id"]);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "PUT",
                route: `users/${userData._id}`,
                body: restData,
                token,
            });
            if (response.status === 200) {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                getUsers();
                react_hot_toast_1.toast.success("User updated successfully", { duration: 2500 });
            }
            else {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                react_hot_toast_1.toast.error("Couldn't Update, Try Again", { duration: 4000 });
            }
        }
        catch (err) {
            console.error(err);
            setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
            react_hot_toast_1.toast.error("Couldn't Update, Try Again", { duration: 2500 });
        }
    });
    const createUser = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = userData, restData = __rest(userData, ["_id"]);
        const asArray = Object.entries(restData);
        const filtered = asArray.filter(([key, value]) => value !== null && value !== "");
        const finalData = Object.fromEntries(filtered);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: `auth/register`,
                body: finalData,
                token,
            });
            if (response.status === 200) {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                getUsers();
                react_hot_toast_1.toast.success("User created successfully", { duration: 2500 });
            }
            else {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                react_hot_toast_1.toast.error("Couldn't Create, Try Again", { duration: 4000 });
            }
        }
        catch (err) {
            console.error(err);
            setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
            react_hot_toast_1.toast.error("Couldn't Create, Try Again", { duration: 2500 });
        }
    });
    const [groupsList, setgroupsList] = (0, react_1.useState)([]);
    const getGroups = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: `groups`,
                token,
            });
            if (response.status === 200) {
                setgroupsList(response.data);
            }
            else {
                react_hot_toast_1.toast.error("Error Getting Groups", { duration: 4000 });
            }
        }
        catch (err) {
            console.error(err);
            react_hot_toast_1.toast.error("Error Getting Groups", { duration: 2500 });
        }
    });
    const transformedGroupsList = groupsList.reduce((acc, currentItem) => {
        console.log(currentItem);
        acc[currentItem.name] = currentItem._id;
        return acc;
    }, 
    // First Element Type Bug (Object -> string)
    {});
    const [filters, setfilters] = (0, react_1.useState)({
        searchQuery: "",
        selectedFilter: "All",
    });
    const filterBySearch = (userList, query) => {
        if (!query) {
            return userList;
        }
        const lowerCaseQuery = query.toLowerCase();
        return userList.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const username = user.username.toLowerCase();
            return (fullName.includes(lowerCaseQuery) ||
                username.includes(lowerCaseQuery));
        });
    };
    const filterByRole = (userList, role) => {
        if (role === "All") {
            return userList;
        }
        return userList.filter((user) => user.user_type === role);
    };
    const filterObjects = (query) => {
        setfilters(Object.assign(Object.assign({}, filters), { searchQuery: query }));
    };
    return (react_1.default.createElement("div", { className: "flex" },
        react_1.default.createElement(sidebar_1.default, { items: ["Dashboard", "Users", "Groups", "Account"], selected: "Users" }),
        react_1.default.createElement("div", { className: "flex flex-col w-full bg-neutral-0" },
            react_1.default.createElement(navbar_1.default, { label: "Users", buttonLabel: "+ Create User", buttonAction: () => activateCreateModal() }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement(modal_1.default, { showModal: createModalState.open, onRequestClose: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: !createModalState.open })) },
                react_1.default.createElement("div", { className: "text-xl" }, "Create/Edit User"),
                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-96" },
                    react_1.default.createElement("div", { className: "flex gap-5" },
                        react_1.default.createElement(input_1.default, { label: "First Name", placeholder: "first name", value: userData.first_name, onChange: (e) => {
                                setUserData(Object.assign(Object.assign({}, userData), { first_name: e.target.value }));
                            }, required: true }),
                        react_1.default.createElement(input_1.default, { label: "Last Name", placeholder: "last name", value: userData.last_name, onChange: (e) => {
                                setUserData(Object.assign(Object.assign({}, userData), { last_name: e.target.value }));
                            }, required: true })),
                    react_1.default.createElement("div", { className: "flex gap-5" },
                        react_1.default.createElement(input_1.default, { label: "Username", placeholder: "username", value: userData.username, onChange: (e) => {
                                setUserData(Object.assign(Object.assign({}, userData), { username: e.target.value }));
                            }, required: true }),
                        react_1.default.createElement(select_1.default, { label: "User Type", required: true, value: userData.user_type, options: {
                                "Super Admin": "1",
                                Admin: "2",
                                Driver: "3",
                            }, onChange: (e) => setUserData(Object.assign(Object.assign({}, userData), { user_type: e.target.value })) })),
                    react_1.default.createElement(select_1.default, { label: "Group", required: true, value: userData.group_id, options: transformedGroupsList, disabled: userData.user_type === "1", onChange: (e) => setUserData(Object.assign(Object.assign({}, userData), { group_id: e.target.value })) }),
                    react_1.default.createElement(input_1.default, { label: "Email", type: "email", placeholder: "Email", value: userData.email, onChange: (e) => {
                            setUserData(Object.assign(Object.assign({}, userData), { email: e.target.value }));
                        } }),
                    createModalState.type === "create" ? (react_1.default.createElement(input_1.default, { label: "Password", type: "password", placeholder: "Password", value: userData.password, onChange: (e) => {
                            setUserData(Object.assign(Object.assign({}, userData), { password: e.target.value }));
                        }, required: true })) : (react_1.default.createElement(input_1.default, { label: "Password", type: "password", placeholder: "Password", value: userData.password, onChange: (e) => {
                            setUserData(Object.assign(Object.assign({}, userData), { password: e.target.value }));
                        } }))),
                react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                    react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false })) }),
                    createModalState.type === "edit" ? (react_1.default.createElement(button_1.default, { label: "Update", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => updateUser() })) : (react_1.default.createElement(button_1.default, { label: "Create", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => createUser() })))),
            react_1.default.createElement(modal_1.default, { showModal: deleteModalState.open, onRequestClose: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: !deleteModalState.open })) },
                react_1.default.createElement("div", { className: "text-xl" }, "Are you sure you want to delete?"),
                react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                    react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false })) }),
                    react_1.default.createElement(button_1.default, { label: "Delete", bgColor: "bg-red-400", hoverColor: "hover:bg-red-500", onClick: () => deleteUser(deleteModalState.id) }))),
            react_1.default.createElement("div", { className: "p-10 pb-2" },
                react_1.default.createElement("div", { className: "flex content-center justify-center py-2 px-5 gap-5 rounded-lg bg-primary-200" },
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center w-1/2" },
                        react_1.default.createElement(input_1.default, { label: "Search", placeholder: "Search by name/username", onChange: (e) => filterObjects(e.target.value) })),
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center w-1/2" },
                        react_1.default.createElement(select_1.default, { label: "Filter by Role", value: filters.selectedFilter, options: {
                                All: "All",
                                "Super Admin": "1",
                                Admin: "2",
                                Driver: "3",
                            }, onChange: (e) => setfilters(Object.assign(Object.assign({}, filters), { selectedFilter: e.target.value })) })))),
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
                        ], object: user, onEdit: (data) => activateEditModal(data), onDelete: (id) => activateDeleteModal(id) }));
                })))));
}
exports.default = SuperAdminUsers;
