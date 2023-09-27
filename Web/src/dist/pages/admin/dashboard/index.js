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
function AdminDashboard() {
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    const [stats, setStats] = (0, react_1.useState)({
        users_count: 0,
        admins_count: 0,
        drivers_count: 0,
        bins_count: 0,
        general_bins_count: 0,
        recyclables_bins_count: 0,
        hazardous_bins_count: 0,
        trucks_count: 0,
        collected_bins_per_day: [
            {
                date: new Date().toISOString(),
                count: 0,
            },
        ],
    });
    const getAnalytics = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: `analytics`,
                token,
            });
            if (response.status === 200) {
                setStats(response.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getAnalytics();
    }, []);
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
            ], selected: "Dashboard" }),
        react_1.default.createElement("div", { className: `flex flex-col w-full ${collapse ? "ml-20" : "ml-52"}` },
            react_1.default.createElement(navbar_1.default, { label: "Dashboard" }),
            react_1.default.createElement("div", { className: "p-5" },
                react_1.default.createElement("div", { className: "flex w-full flex-wrap md:flex-nowrap justify-center gap-16 h-fit text-gunmetal" },
                    react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-2" },
                        react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-2" },
                            react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded" },
                                react_1.default.createElement("div", { className: " text-xl" }, "Users\u00A0Count"),
                                react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.users_count)),
                            react_1.default.createElement("div", { className: "flex flex-wrap sm:flex-nowrap h-full gap-2" },
                                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded" },
                                    react_1.default.createElement("div", { className: " text-xl" }, "Admins"),
                                    react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.admins_count)),
                                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded" },
                                    react_1.default.createElement("div", { className: " text-xl" }, "Drivers"),
                                    react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.drivers_count))))),
                    react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-2" },
                        react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-2" },
                            react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded" },
                                react_1.default.createElement("div", { className: " text-xl" }, "Bins\u00A0Count"),
                                react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.bins_count)),
                            react_1.default.createElement("div", { className: "flex flex-wrap lg:flex-nowrap h-full gap-2" },
                                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded" },
                                    react_1.default.createElement("div", { className: " text-xl" }, "General"),
                                    react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.general_bins_count)),
                                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded" },
                                    react_1.default.createElement("div", { className: " text-xl" }, "Recyclables"),
                                    react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.recyclables_bins_count)),
                                react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded" },
                                    react_1.default.createElement("div", { className: " text-xl" }, "Hazardous"),
                                    react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.hazardous_bins_count))))),
                    react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-2" },
                        react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-2" },
                            react_1.default.createElement("div", { className: "flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded" },
                                react_1.default.createElement("div", { className: " text-xl" }, "Trucks\u00A0Count"),
                                react_1.default.createElement("div", { className: "mt-5 font-bold text-4xl" }, stats === null || stats === void 0 ? void 0 : stats.trucks_count)))))))));
}
exports.default = AdminDashboard;
