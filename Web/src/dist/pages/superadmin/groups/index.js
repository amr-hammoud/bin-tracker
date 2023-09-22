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
function SuperAdminGroups() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const [groupList, setGroupList] = (0, react_1.useState)([]);
    const getGroups = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: "groups/",
                token,
            });
            console.log(response);
            if (response.status === 200) {
                setGroupList(response.data);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getGroups();
    }, []);
    return (react_1.default.createElement("div", { className: "flex" },
        react_1.default.createElement(sidebar_1.default, { items: ["Dashboard", "Users", "Groups", "Account"], selected: "Groups" }),
        react_1.default.createElement("div", { className: "flex flex-col w-full" },
            react_1.default.createElement(navbar_1.default, { label: "Groups" }),
            react_1.default.createElement("div", { className: "p-10" },
                react_1.default.createElement(listheader_1.default, { items: ["Name", "Admins Count", "Members Count", "Actions"] }),
                groupList.map((group, index) => {
                    return (react_1.default.createElement(listItem_1.default, { key: index, items: [
                            group.name,
                            group.admins.length.toString(),
                            group.members.length.toString(),
                        ] }));
                })))));
}
exports.default = SuperAdminGroups;
