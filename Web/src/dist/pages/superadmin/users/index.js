"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const request_1 = require("../../../configs/request");
const react_hot_toast_1 = require("react-hot-toast");
function SuperAdminUsers() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const [userList, setUserList] = (0, react_1.useState)([]);
    const getUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "users/",
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
    const [deleteModalState, setdeleteModalState] = (0, react_1.useState)({
        open: false,
        id: "",
    });
    const activateDeleteModal = (id) => {
        setdeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: true, id: id }));
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
                setdeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
                react_hot_toast_1.toast.success("User Deleted Successfully", { duration: 2500 });
                setUserList(newArr);
            }
        }
        catch (err) {
            console.error(err);
            setdeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
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
    });
}
exports.default = SuperAdminUsers;
;
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
                react_1.default.createElement(input_1.default, { label: "Username", placeholder: "username", value: userData.username, onChange: (e) => {
                        setUserData(Object.assign(Object.assign({}, userData), { username: e.target.value }));
                    }, required: true }),
                react_1.default.createElement(input_1.default, { label: "Email", type: "email", placeholder: "Email", value: userData.email, onChange: (e) => {
                        setUserData(Object.assign(Object.assign({}, userData), { email: e.target.value }));
                    } }),
                createModalState.type === "create" ? (react_1.default.createElement(input_1.default, { label: "Password", type: "password", placeholder: "Password", value: userData.password, onChange: (e) => {
                        setUserData(Object.assign(Object.assign({}, userData), { password: e.target.value }));
                    }, required: true })) : (react_1.default.createElement(input_1.default, { label: "Password", type: "password", placeholder: "Password", value: userData.password, onChange: (e) => {
                        setUserData(Object.assign(Object.assign({}, userData), { password: e.target.value }));
                    } })),
                react_1.default.createElement(select_1.default, { label: "User Type", required: true, value: userData.user_type, options: { "Super Admin": "1", "Admin": "2", "Driver": "3" }, onChange: (e) => setUserData(Object.assign(Object.assign({}, userData), { user_type: e.target.value })) })),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false })) }),
                createModalState.type === "edit" ? (react_1.default.createElement(button_1.default, { label: "Update", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => updateUser() })) : (react_1.default.createElement(button_1.default, { label: "Create", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => createUser() })))),
        react_1.default.createElement(modal_1.default, { showModal: deleteModalState.open, onRequestClose: () => setdeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: !deleteModalState.open })) },
            react_1.default.createElement("div", { className: "text-xl" }, "Are you sure you want to delete?"),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setdeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false })) }),
                react_1.default.createElement(button_1.default, { label: "Delete", bgColor: "bg-red-400", hoverColor: "hover:bg-red-500", onClick: () => deleteUser(deleteModalState.id) }))),
        react_1.default.createElement("div", { className: "p-10" },
            react_1.default.createElement(listheader_1.default, { items: ["ID", "Name", "Username", "Role", "Actions"] }),
            userList.map((user, key) => {
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
                        user._id,
                        `${user.first_name} ${user.last_name}`,
                        user.username,
                        user_type,
                    ], object: user, onEdit: (data) => activateEditModal(data), onDelete: (id) => activateDeleteModal(id) }));
            })))));
