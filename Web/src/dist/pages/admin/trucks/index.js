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
const listheader_1 = __importDefault(require("../../../components/base/listheader"));
const request_1 = require("../../../configs/request");
const listItem_1 = __importDefault(require("../../../components/base/listItem"));
const modal_1 = __importDefault(require("../../../components/base/modal"));
const button_1 = __importDefault(require("../../../components/base/button"));
const react_hot_toast_1 = require("react-hot-toast");
const input_1 = __importDefault(require("../../../components/base/input"));
const select_1 = __importDefault(require("../../../components/base/select"));
function AdminTrucks() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    const [truckList, setTruckList] = (0, react_1.useState)([]);
    const [driverList, setDriverList] = (0, react_1.useState)([]);
    const getTrucks = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "trucks/",
                token,
            });
            if (response.status === 200) {
                setTruckList(response.data);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    const getDrivers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: `users/drivers`,
                token,
            });
            if (response.status === 200) {
                setDriverList(response.data);
            }
            else {
                react_hot_toast_1.toast.error("Error Getting Drivers", { duration: 4000 });
            }
        }
        catch (err) {
            console.error(err);
            react_hot_toast_1.toast.error("Error Getting Drivers", { duration: 2500 });
        }
    });
    (0, react_1.useEffect)(() => {
        getTrucks();
        getDrivers();
    }, []);
    const [deleteModalState, setDeleteModalState] = (0, react_1.useState)({
        open: false,
        id: "",
    });
    const activateDeleteModal = (id) => {
        setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: true, id: id }));
    };
    const deleteTruck = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "DELETE",
                route: `trucks/${id}`,
                token,
            });
            if (response.status === 200) {
                const newArr = truckList.filter((truck) => {
                    return (truck === null || truck === void 0 ? void 0 : truck._id) !== id;
                });
                setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
                react_hot_toast_1.toast.success("Truck Deleted Successfully", { duration: 2500 });
                setTruckList(newArr);
            }
        }
        catch (err) {
            console.error(err);
            setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
            react_hot_toast_1.toast.error("Couldn't Delete Truck", { duration: 4000 });
        }
    });
    const [createModalState, setCreateModalState] = (0, react_1.useState)({
        open: false,
        type: "create",
    });
    const [truckData, setTruckData] = (0, react_1.useState)({
        _id: "",
        plate_number: "",
        group_id: "",
        driver_id: "",
        last_oil_change: "",
        last_wash: "",
    });
    const activateCreateModal = () => {
        setTruckData(Object.assign(Object.assign({}, truckData), { _id: "", plate_number: "", group_id: user === null || user === void 0 ? void 0 : user.group_id, driver_id: driverList[0]._id, last_oil_change: "", last_wash: "" }));
        setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: true, type: "create" }));
    };
    const createTruck = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = truckData, restData = __rest(truckData, ["_id"]);
        const asArray = Object.entries(restData);
        const filtered = asArray.filter(([key, value]) => value !== null && value !== "");
        const finalData = Object.fromEntries(filtered);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: `trucks`,
                body: finalData,
                token,
            });
            if (response.status === 200) {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                getTrucks();
                react_hot_toast_1.toast.success("Truck created successfully", { duration: 2500 });
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
    const transformedDriversList = driverList.reduce((acc, currentItem) => {
        acc[currentItem.username] = currentItem._id;
        return acc;
    }, {});
    const activateEditModal = (data) => {
        const truck = JSON.parse(data);
        setTruckData(Object.assign(Object.assign({}, truckData), { _id: truck._id, plate_number: truck.plate_number, group_id: truck.group_id, driver_id: truck.driver_id, last_oil_change: truck.last_oil_change, last_wash: truck.last_wash }));
        setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: true, type: "edit" }));
    };
    const updateTruck = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = truckData, restData = __rest(truckData, ["_id"]);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: `trucks/${truckData._id}`,
                body: restData,
                token,
            });
            if (response.status === 200) {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                getTrucks();
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
    const [filters, setfilters] = (0, react_1.useState)({
        searchQuery: "",
        selectedFilter: "All",
    });
    const filterBySearch = (userList, query) => {
        if (!query) {
            return userList;
        }
        const lowerCaseQuery = query.toLowerCase();
        return userList.filter((truck) => {
            const plate_number = truck.plate_number.toLowerCase();
            const driver_name = `${truck.driver_id.first_name} ${truck.driver_id.last_name}`.toLowerCase();
            return (plate_number.includes(lowerCaseQuery) ||
                driver_name.includes(lowerCaseQuery));
        });
    };
    const filterObjects = (query) => {
        setfilters(Object.assign(Object.assign({}, filters), { searchQuery: query }));
    };
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
            ], selected: "Trucks" }),
        react_1.default.createElement(modal_1.default, { showModal: createModalState.open, onRequestClose: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: !createModalState.open })) },
            react_1.default.createElement("div", { className: "text-xl" }, "Create/Edit User"),
            react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-96" },
                react_1.default.createElement("div", { className: "flex gap-5" },
                    react_1.default.createElement(input_1.default, { label: "Plate Number", placeholder: "plate", value: truckData.plate_number, onChange: (e) => {
                            setTruckData(Object.assign(Object.assign({}, truckData), { plate_number: e.target.value }));
                        }, required: true })),
                react_1.default.createElement("div", { className: "flex gap-5" },
                    react_1.default.createElement(input_1.default, { label: "Last Oil Change", type: "date", value: truckData.last_oil_change, onChange: (e) => {
                            setTruckData(Object.assign(Object.assign({}, truckData), { last_oil_change: e.target.value }));
                        }, required: true }),
                    react_1.default.createElement(input_1.default, { label: "Last Wash", type: "date", value: truckData.last_wash, onChange: (e) => {
                            setTruckData(Object.assign(Object.assign({}, truckData), { last_wash: e.target.value }));
                        }, required: true })),
                react_1.default.createElement(select_1.default, { label: "Driver", required: true, value: truckData.driver_id, options: transformedDriversList, onChange: (e) => setTruckData(Object.assign(Object.assign({}, truckData), { driver_id: e.target.value })) })),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false })) }),
                createModalState.type === "edit" ? (react_1.default.createElement(button_1.default, { label: "Update", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => updateTruck() })) : (react_1.default.createElement(button_1.default, { label: "Create", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => createTruck() })))),
        react_1.default.createElement(modal_1.default, { showModal: deleteModalState.open, onRequestClose: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: !deleteModalState.open })) },
            react_1.default.createElement("div", { className: "text-xl" }, "Are you sure you want to delete?"),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false })) }),
                react_1.default.createElement(button_1.default, { label: "Delete", bgColor: "bg-red-400", hoverColor: "hover:bg-red-500", onClick: () => deleteTruck(deleteModalState.id) }))),
        react_1.default.createElement("div", { className: `flex flex-col w-full ${collapse ? "ml-20" : "ml-52"}` },
            react_1.default.createElement(navbar_1.default, { label: "Trucks", buttonLabel: "+ Create Truck", buttonAction: () => activateCreateModal() }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement("div", { className: "p-10 pb-2" },
                react_1.default.createElement("div", { className: "flex content-center justify-center py-2 px-5 gap-5 rounded-lg bg-primary-200" },
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center w-1/2" },
                        react_1.default.createElement(input_1.default, { label: "Search", placeholder: "Search by plate number/driver", onChange: (e) => filterObjects(e.target.value) })))),
            react_1.default.createElement("div", { className: "p-10" },
                react_1.default.createElement(listheader_1.default, { items: [
                        "Plate Number",
                        "Driver",
                        "Last Oil Change",
                        "Last Wash",
                        "Actions",
                    ] }),
                filterBySearch(truckList, filters.searchQuery).map((truck, index) => {
                    return (react_1.default.createElement(listItem_1.default, { key: index, items: [
                            truck.plate_number,
                            truck.driver_id.first_name +
                                " " +
                                truck.driver_id.last_name,
                            truck.last_oil_change,
                            truck.last_wash,
                        ], object: truck, onEdit: (data) => activateEditModal(data), onDelete: (id) => activateDeleteModal(id) }));
                })))));
}
exports.default = AdminTrucks;
