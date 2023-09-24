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
const md_1 = require("react-icons/md");
const listheader_1 = __importDefault(require("../../../components/base/listheader"));
const react_hot_toast_1 = require("react-hot-toast");
const button_1 = __importDefault(require("../../../components/base/button"));
const select_1 = __importDefault(require("../../../components/base/select"));
const input_1 = __importDefault(require("../../../components/base/input"));
const modal_1 = __importDefault(require("../../../components/base/modal"));
function AdminBins() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const [binsList, setBinList] = (0, react_1.useState)([]);
    const getBins = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "bins/",
                token,
            });
            if (response.status === 200) {
                setBinList(response.data);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getBins();
    }, []);
    const [deleteModalState, setDeleteModalState] = (0, react_1.useState)({
        open: false,
        id: "",
    });
    const activateDeleteModal = (id) => {
        setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: true, id: id }));
    };
    const deleteBins = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "DELETE",
                route: `bins/${id}`,
                token,
            });
            if (response.status === 200) {
                const newArr = binsList.filter((bin) => {
                    return bin._id !== id;
                });
                setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
                react_hot_toast_1.toast.success("Truck Deleted Successfully", { duration: 2500 });
                setBinList(newArr);
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
    const [binData, setBinData] = (0, react_1.useState)({
        _id: "",
        custom_id: "",
        longitude: "",
        latitude: "",
        group_id: "",
        last_pickup_time: "",
        waste_type: "",
        data: [],
    });
    const activateCreateModal = () => {
        setBinData(Object.assign(Object.assign({}, binData), { _id: "", custom_id: "", longitude: "", latitude: "", group_id: user === null || user === void 0 ? void 0 : user.group_id, last_pickup_time: "", waste_type: "General", data: [] }));
        setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: true, type: "create" }));
    };
    const createBin = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = binData, restData = __rest(binData, ["_id"]);
        const asArray = Object.entries(restData);
        const filtered = asArray.filter(([key, value]) => value !== null && value !== "");
        const finalData = Object.fromEntries(filtered);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: `bins`,
                body: finalData,
                token,
            });
            if (response.status === 200) {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                getBins();
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
    const showLocation = () => {
        console.log("Location");
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
            ], selected: "Bins" }),
        react_1.default.createElement(modal_1.default, { showModal: createModalState.open, onRequestClose: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: !createModalState.open })) },
            react_1.default.createElement("div", { className: "text-xl" }, "Create/Edit User"),
            react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-96" },
                react_1.default.createElement("div", { className: "flex gap-5" },
                    react_1.default.createElement(input_1.default, { label: "Custom ID", placeholder: "id", value: binData.custom_id, onChange: (e) => {
                            setBinData(Object.assign(Object.assign({}, binData), { custom_id: e.target.value }));
                        }, required: true })),
                react_1.default.createElement("div", { className: "flex gap-5" },
                    react_1.default.createElement(input_1.default, { label: "Latitude", placeholder: "latitude", value: binData.latitude, onChange: (e) => {
                            setBinData(Object.assign(Object.assign({}, binData), { latitude: e.target.value }));
                        }, required: true }),
                    react_1.default.createElement(input_1.default, { label: "Longitude", placeholder: "longitude", value: binData.longitude, onChange: (e) => {
                            setBinData(Object.assign(Object.assign({}, binData), { longitude: e.target.value }));
                        }, required: true })),
                react_1.default.createElement(input_1.default, { label: "Last Pickup", type: "date", value: binData.last_pickup_time, onChange: (e) => {
                        setBinData(Object.assign(Object.assign({}, binData), { last_pickup_time: e.target.value }));
                    }, required: true }),
                react_1.default.createElement(select_1.default, { label: "Waste Type", required: true, value: binData.waste_type, options: {
                        General: "General",
                        Recyclables: "Recyclables",
                        Hazardous: "Hazardous",
                    }, onChange: (e) => setBinData(Object.assign(Object.assign({}, binData), { waste_type: e.target.value })) })),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false })) }),
                createModalState.type === "edit" ? (react_1.default.createElement(button_1.default, { label: "Update", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700" })) : (react_1.default.createElement(button_1.default, { label: "Create", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => createBin() })))),
        react_1.default.createElement(modal_1.default, { showModal: deleteModalState.open, onRequestClose: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: !deleteModalState.open })) },
            react_1.default.createElement("div", { className: "text-xl" }, "Are you sure you want to delete?"),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false })) }),
                react_1.default.createElement(button_1.default, { label: "Delete", bgColor: "bg-red-400", hoverColor: "hover:bg-red-500", onClick: () => deleteBins(deleteModalState.id) }))),
        react_1.default.createElement("div", { className: "flex flex-col w-full" },
            react_1.default.createElement(navbar_1.default, { label: "Bins", buttonLabel: "+ Create Bin", buttonAction: () => activateCreateModal() }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement("div", { className: "p-10" },
                react_1.default.createElement(listheader_1.default, { items: [
                        "ID",
                        "Waste Type",
                        "Last pickup time",
                        "Actions",
                    ] }),
                binsList.map((bin, index) => {
                    return (react_1.default.createElement(listItem_1.default, { key: index, items: [
                            bin.custom_id,
                            bin.waste_type,
                            bin.last_pickup_time,
                        ], object: bin, customIcon: react_1.default.createElement(md_1.MdLocationPin, null), customIconAction: () => showLocation(), onDelete: (id) => activateDeleteModal(id) }));
                    //TODO: Add location icon to listItem
                })))));
}
exports.default = AdminBins;
