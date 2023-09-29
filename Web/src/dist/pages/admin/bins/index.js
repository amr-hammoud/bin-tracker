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
const react_router_dom_1 = require("react-router-dom");
const locationInput_1 = __importDefault(require("../../../components/map/locationInput"));
function AdminBins() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
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
                react_hot_toast_1.toast.success("Bin Deleted Successfully", { duration: 2500 });
                setBinList(newArr);
            }
        }
        catch (err) {
            console.error(err);
            setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false }));
            react_hot_toast_1.toast.error("Couldn't Delete Bin", { duration: 4000 });
        }
    });
    const [createModalState, setCreateModalState] = (0, react_1.useState)({
        open: false,
        type: "create",
    });
    const [binData, setBinData] = (0, react_1.useState)({
        _id: "",
        name: "",
        latitude: "33.880166",
        longitude: "35.851174",
        group_id: "",
        last_pickup_time: "",
        waste_type: "",
        data: [],
    });
    const activateCreateModal = () => {
        setBinData(Object.assign(Object.assign({}, binData), { _id: "", name: "", latitude: "33.880166", longitude: "35.851174", group_id: user === null || user === void 0 ? void 0 : user.group_id, last_pickup_time: "", waste_type: "General", data: [] }));
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
                react_hot_toast_1.toast.success("Bin created successfully", { duration: 2500 });
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
    const activateEditModal = (data) => {
        var _a;
        const bin = JSON.parse(data);
        setBinData(Object.assign(Object.assign({}, binData), { _id: bin._id, name: bin.name, longitude: bin.longitude, latitude: bin.latitude, group_id: bin.group_id, last_pickup_time: (_a = bin.collection_history[bin.collection_history.length - 1]) === null || _a === void 0 ? void 0 : _a.updatedAt, waste_type: bin.waste_type, data: bin.data }));
        setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: true, type: "edit" }));
    };
    const updateBin = () => __awaiter(this, void 0, void 0, function* () {
        const { _id } = binData, restData = __rest(binData, ["_id"]);
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: `bins/${binData._id}`,
                body: restData,
                token,
            });
            if (response.status === 200) {
                setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false }));
                getBins();
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
    const filterBySearch = (binsList, query) => {
        if (!query) {
            return binsList;
        }
        const lowerCaseQuery = query.toLowerCase();
        return binsList.filter((bin) => {
            const id = bin._id.toLowerCase();
            const name = bin.name.toLowerCase();
            return name.includes(lowerCaseQuery) || id.includes(lowerCaseQuery);
        });
    };
    const filterByWasteType = (binsList, type) => {
        if (type === "All") {
            return binsList;
        }
        return binsList.filter((bin) => bin.waste_type === type);
    };
    const filterObjects = (query) => {
        setfilters(Object.assign(Object.assign({}, filters), { searchQuery: query }));
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const showLocation = (object) => {
        navigate(`/map/${object._id}`, { replace: true });
    };
    const handleLocationChange = (lat, lng) => {
        setBinData(Object.assign(Object.assign({}, binData), { latitude: lat.toString(), longitude: lng.toString() }));
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
                    react_1.default.createElement(input_1.default, { label: "Name", placeholder: "name", value: binData.name, onChange: (e) => {
                            setBinData(Object.assign(Object.assign({}, binData), { name: e.target.value }));
                            console.log(e.target.value);
                        }, required: true })),
                react_1.default.createElement("div", { className: "h-60 w-full my-5 z-10" },
                    react_1.default.createElement("div", { className: "font-poppins text-sm text-gunmetal" },
                        "Location",
                        react_1.default.createElement("span", { className: " text-red-500" }, "*")),
                    react_1.default.createElement(locationInput_1.default, { lat: binData.latitude, lng: binData.longitude, onLocationChange: handleLocationChange })),
                react_1.default.createElement(select_1.default, { label: "Waste Type", required: true, value: binData.waste_type, options: {
                        General: "General",
                        Recyclables: "Recyclables",
                        Hazardous: "Hazardous",
                    }, onChange: (e) => setBinData(Object.assign(Object.assign({}, binData), { waste_type: e.target.value })) })),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setCreateModalState(Object.assign(Object.assign({}, createModalState), { open: false })) }),
                createModalState.type === "edit" ? (react_1.default.createElement(button_1.default, { label: "Update", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => updateBin() })) : (react_1.default.createElement(button_1.default, { label: "Create", bgColor: "bg-primary-500", hoverColor: "hover:bg-primary-700", onClick: () => createBin() })))),
        react_1.default.createElement(modal_1.default, { showModal: deleteModalState.open, onRequestClose: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: !deleteModalState.open })) },
            react_1.default.createElement("div", { className: "text-xl" }, "Are you sure you want to delete?"),
            react_1.default.createElement("div", { className: "flex w-full justify-center gap-10 mt-5" },
                react_1.default.createElement(button_1.default, { label: "Cancel", color: "text-gunmetal", bgColor: "bg-neutral-100", hoverColor: "hover:bg-neutral-600", onClick: () => setDeleteModalState(Object.assign(Object.assign({}, deleteModalState), { open: false })) }),
                react_1.default.createElement(button_1.default, { label: "Delete", bgColor: "bg-red-400", hoverColor: "hover:bg-red-500", onClick: () => deleteBins(deleteModalState.id) }))),
        react_1.default.createElement("div", { className: `flex flex-col w-full ${collapse ? "ml-20" : "ml-52"}` },
            react_1.default.createElement(navbar_1.default, { label: "Bins", buttonLabel: "+ Create Bin", buttonAction: () => activateCreateModal() }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement("div", { className: "p-10 pb-2" },
                react_1.default.createElement("div", { className: "flex content-center justify-center py-2 px-5 gap-5 rounded-lg bg-primary-200" },
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center w-1/2" },
                        react_1.default.createElement(input_1.default, { label: "Search", placeholder: "Search by id/name", onChange: (e) => filterObjects(e.target.value) })),
                    react_1.default.createElement("div", { className: "flex flex-wrap content-center w-1/2" },
                        react_1.default.createElement(select_1.default, { label: "Filter by waste type", value: filters.selectedFilter, options: {
                                All: "All",
                                General: "General",
                                Recyclables: "Recyclables",
                                Hazardous: "Hazardous",
                            }, onChange: (e) => setfilters(Object.assign(Object.assign({}, filters), { selectedFilter: e.target.value })) })))),
            react_1.default.createElement("div", { className: "p-10 pt-3" },
                react_1.default.createElement(listheader_1.default, { items: [
                        "ID",
                        "Name",
                        "Waste Type",
                        "Last pickup time",
                        "Actions",
                    ] }),
                filterByWasteType(filterBySearch(binsList, filters.searchQuery), filters.selectedFilter).map((bin, index) => {
                    var _a;
                    const updatedAt = (_a = bin.collection_history[bin.collection_history.length - 1]) === null || _a === void 0 ? void 0 : _a.updatedAt;
                    const date = new Date(updatedAt);
                    const formattedDate = date.toLocaleString("en-US", {
                        day: "2-digit",
                        month: "long",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    });
                    function isValidDate(date) {
                        return isFinite(date.getTime());
                    }
                    return (react_1.default.createElement(listItem_1.default, { key: index, items: [
                            bin._id,
                            bin.name,
                            bin.waste_type,
                            isValidDate(date) ? formattedDate : "-",
                        ], object: bin, customIcon: react_1.default.createElement(md_1.MdLocationPin, null), customIconAction: (object) => showLocation(object), onEdit: (data) => activateEditModal(data), onDelete: (id) => activateDeleteModal(id) }));
                    //TODO: Add location icon to listItem
                })))));
}
exports.default = AdminBins;
