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
const main_1 = __importDefault(require("../../../components/map/main"));
const request_1 = require("../../../configs/request");
const react_router_dom_1 = require("react-router-dom");
const linechart_1 = __importDefault(require("../../../components/map/linechart"));
const ri_1 = require("react-icons/ri");
const button_1 = __importDefault(require("../../../components/base/button"));
const rangeInput_1 = __importDefault(require("../../../components/map/rangeInput"));
const react_hot_toast_1 = __importStar(require("react-hot-toast"));
function AdminMap() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    const [activeStyle, setActiveStyle] = (0, react_1.useState)(0);
    const [activeBin, setActiveBin] = (0, react_1.useState)(null);
    const [mapPosition, setMapPosition] = (0, react_1.useState)({
        lat: 34.0,
        lng: 36.0,
    });
    const { id } = (0, react_router_dom_1.useParams)();
    const setActiveBinID = (data) => {
        let bins = [];
        id !== null
            ? (bins = data.filter((bin) => {
                return bin._id === id;
            }))
            : console.log("No Active Bin");
        id && bins.length > 0 ? setActiveBin(bins[0]) : setActiveBin(null);
    };
    const [binsList, setBinList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        getBins();
    }, []);
    const getBins = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "bins/",
                token,
            });
            if (response.status === 200) {
                setBinList(response.data);
                setActiveBinID(response.data);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    const [suggestedRoute, setSuggestedRoute] = (0, react_1.useState)("");
    const formatBins = (binsList) => {
        return binsList.map((bin) => {
            var _a;
            return ({
                latitude: bin.latitude,
                longitude: bin.longitude,
                fill_level: bin.data.length > 0 ? bin.data[bin.data.length - 1].record : 0,
                last_pickup_time: (_a = bin.collection_history[bin.collection_history.length - 1]) === null || _a === void 0 ? void 0 : _a.updatedAt,
            });
        });
    };
    const prepareAndSendToAPI = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setSuggestedRoute("");
            if (filteredBins.length === 0) {
                react_hot_toast_1.default.error("No Bins Selected, Modify the filter", {
                    duration: 4000,
                });
                return;
            }
            const bins = formatBins(filteredBins);
            (0, react_hot_toast_1.default)("Processing", {
                icon: "⚙️",
                duration: 500,
            });
            const osrmResponse = yield (0, request_1.sendRequest)({
                method: "POST",
                route: "bins/best-route",
                body: { bins: bins },
                token,
            });
            if (osrmResponse.status === 200) {
                setTimeout(() => {
                    react_hot_toast_1.default.success("Route Suggestion Complete", {
                        duration: 1500,
                    });
                    console.log(osrmResponse.data.geometry);
                    setSuggestedRoute(osrmResponse.data.geometry);
                }, 500);
            }
            else {
                setTimeout(() => {
                    react_hot_toast_1.default.error("Something wrong happened,\nroute suggestion not complete", {
                        duration: 4000,
                    });
                }, 500);
            }
        }
        catch (error) {
            console.error("Error calculating optimal route:", error);
        }
    });
    const [filterValues, setFilterValues] = (0, react_1.useState)([0, 100]);
    const [filteredBins, setFilteredBins] = (0, react_1.useState)([]);
    const filterBinsByFillLevel = (bins, minFillLevel, maxFillLevel) => {
        return bins.filter((bin) => {
            const lastRecord = bin.data.length > 0
                ? parseFloat(bin.data[bin.data.length - 1].record)
                : 0;
            return lastRecord >= minFillLevel && lastRecord <= maxFillLevel;
        });
    };
    (0, react_1.useEffect)(() => {
        const filteredBins = filterBinsByFillLevel(binsList, filterValues[0], filterValues[1]);
        setActiveBin(null);
        setFilteredBins(filteredBins);
    }, [filterValues]);
    (0, react_1.useEffect)(() => {
        const filteredBins = filterBinsByFillLevel(binsList, filterValues[0], filterValues[1]);
        setFilteredBins(filteredBins);
    }, [binsList]);
    return (react_1.default.createElement("div", { className: "flex h-screen w-full" },
        react_1.default.createElement(sidebar_1.default, { items: [
                "Dashboard",
                "Bins",
                "Map",
                "Users",
                "Trucks",
                "Announcements",
                "Chats",
                "Account",
            ], selected: "Map" }),
        react_1.default.createElement("div", { className: `flex flex-col w-full relative ${collapse ? "ml-20" : "ml-52"}` },
            react_1.default.createElement(navbar_1.default, { label: "Map" }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement("div", { className: `w-full h-full z-10` },
                react_1.default.createElement(main_1.default, { center: mapPosition, zoom: 8, layerStyle: activeStyle, bins: filteredBins, positionSetter: () => setMapPosition, activeBin: activeBin, activeBinSetter: setActiveBin, onbinClick: (e) => {
                        console.log(e);
                    }, routeString: suggestedRoute })),
            react_1.default.createElement("div", { className: "absolute flex flex-col content-center gap-2 top-16 right-5 z-20" },
                react_1.default.createElement("div", { className: "flex content-center gap-2" },
                    react_1.default.createElement("h3", { className: "flex flex-wrap content-center m-1 font-semibold text-gunmetal" }, "Style"),
                    react_1.default.createElement("div", { className: "flex h-10 w-80 justify-around bg-neutral-0 shadow-lg p-2 gap-2 text-gunmetal rounded-md border border-primary-500" },
                        react_1.default.createElement("div", { className: `flex flex-wrap justify-center content-center p-2 text-center
										rounded-md border border-neutral-700 ${activeStyle === 0
                                ? "bg-primary-100"
                                : ""}
										hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`, onClick: () => setActiveStyle(0) }, "Default"),
                        react_1.default.createElement("div", { className: `flex flex-wrap justify-center content-center p-2 text-center
										rounded-md border border-neutral-700 ${activeStyle === 1
                                ? "bg-primary-100"
                                : ""}
										hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`, onClick: () => setActiveStyle(1) }, "Atlas"),
                        react_1.default.createElement("div", { className: `flex flex-wrap justify-center content-center p-2 text-center
							rounded-md border border-neutral-700 ${activeStyle === 2 ? "bg-primary-100" : ""}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`, onClick: () => setActiveStyle(2) }, "Terrain"),
                        react_1.default.createElement("div", { className: `flex flex-wrap justify-center content-center p-2 text-center
							rounded-md border border-neutral-700 ${activeStyle === 3 ? "bg-primary-100" : ""}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`, onClick: () => setActiveStyle(3) }, "Lines"))),
                react_1.default.createElement("div", { className: "flex content-center gap-2" },
                    react_1.default.createElement("h3", { className: "flex flex-wrap content-center m-1 font-semibold text-gunmetal" }, "Filter"),
                    react_1.default.createElement("div", { className: "flex h-fit w-80 bg-neutral-0 shadow-lg p-2 gap-2 text-gunmetal rounded-md border border-primary-500" },
                        react_1.default.createElement(rangeInput_1.default, { values: filterValues, setter: (values) => setFilterValues(values) }))),
                react_1.default.createElement("div", { className: "flex content-center gap-2" },
                    react_1.default.createElement("h3", { className: "flex flex-wrap content-center m-1 font-semibold text-gunmetal" }, "Route"),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(button_1.default, { label: "Suggest Route", onClick: () => prepareAndSendToAPI() })),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(button_1.default, { label: "Clear Route", onClick: () => setSuggestedRoute("") })))),
            activeBin ? (react_1.default.createElement("div", { className: "flex justify-center absolute bottom-5 left-5 z-20 w-11/12 pl-16" },
                react_1.default.createElement("div", { className: "flex flex-col h-fit w-full bg-neutral-0 shadow-lg rounded-md border border-primary-500" },
                    react_1.default.createElement("div", { className: "flex justify-between pt-3 pl-5 pr-10" },
                        react_1.default.createElement("div", { className: "flex gap-2 font-semibold text-gunmetal" },
                            react_1.default.createElement("div", { className: "flex flex-wrap content-center text-primary-500 font-semibold text-lg" },
                                react_1.default.createElement(ri_1.RiDeleteBin6Line, null)),
                            react_1.default.createElement("div", { className: "flex flex-wrap content-center text-primary-500 font-semibold text-lg" }, activeBin === null || activeBin === void 0 ? void 0 : activeBin.name)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(button_1.default, { label: "Close", onClick: () => setActiveBin(null) }))),
                    react_1.default.createElement("div", { className: "flex flex-col pl-2 w-full " },
                        react_1.default.createElement("div", { className: "flex h-fit pl-75 p-4 gap-4 text-gunmetal w-full" },
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("span", { className: "font-bold" }, "ID:"),
                                " ", activeBin === null || activeBin === void 0 ? void 0 :
                                activeBin._id),
                            "|",
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("span", { className: "font-bold" }, "Waste Type:"),
                                " ", activeBin === null || activeBin === void 0 ? void 0 :
                                activeBin.waste_type)),
                        react_1.default.createElement("div", { className: " h-52 w-full z-30 bg-neutral-0" },
                            react_1.default.createElement(linechart_1.default, { data: activeBin.data })))))) : (""))));
}
exports.default = AdminMap;
