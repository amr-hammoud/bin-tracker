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
const messages_1 = __importDefault(require("../../../components/messages"));
const request_1 = require("../../../configs/request");
const date_fns_1 = require("date-fns");
const io5_1 = require("react-icons/io5");
const react_hot_toast_1 = require("react-hot-toast");
function AdminAnnouncements() {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    const collapse = (0, react_redux_1.useSelector)((state) => state.sidebar.collapse);
    const [announcements, setAnnouncements] = (0, react_1.useState)([]);
    const [groupedAnnouncements, setGroupedAnnouncements] = (0, react_1.useState)({});
    const [rowCount, setRowCount] = (0, react_1.useState)(1);
    const [messageText, setMessageText] = (0, react_1.useState)("");
    const getMessages = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                route: `announcements/${user.group_id}`,
                token,
            });
            if (response.status === 200) {
                setAnnouncements(response.data);
                console.log(response);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getMessages();
    }, []);
    (0, react_1.useEffect)(() => {
        const grouped = {};
        announcements.forEach((message) => {
            const date = (0, date_fns_1.parseISO)(message.createdAt);
            const formattedDate = (0, date_fns_1.format)(date, "MMMM dd, yyyy");
            if (!grouped[formattedDate]) {
                grouped[formattedDate] = [];
            }
            grouped[formattedDate].push(message);
        });
        setGroupedAnnouncements(grouped);
    }, [announcements]);
    const handleTextareaChange = (text) => {
        setMessageText(text);
        const lines = text.split("\n");
        const lineCount = Math.min(5, lines.length);
        setRowCount(lineCount);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.ctrlKey && messageText !== "") {
            sendMessage();
            e.preventDefault();
        }
    };
    const sendMessage = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, request_1.sendRequest)({
                method: "POST",
                route: `announcements`,
                body: { group_id: user.group_id, content: messageText.trim() },
                token,
            });
            if (response.status === 200) {
                setMessageText("");
            }
            else {
                react_hot_toast_1.toast.error("Couldn't Send, Try Again", { duration: 4000 });
            }
        }
        catch (err) {
            console.error(err);
            react_hot_toast_1.toast.error("Couldn't Send, Try Again", { duration: 2500 });
        }
    });
    const handleMessage = () => { };
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
            ], selected: "Announcements" }),
        react_1.default.createElement("div", { className: `flex flex-col w-full relative ${collapse ? "ml-20" : "ml-52"}` },
            react_1.default.createElement(navbar_1.default, { label: "Announcements" }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_hot_toast_1.Toaster, null)),
            react_1.default.createElement("div", { className: "p-5 bg-neutral-100 h-full" }, Object.keys(groupedAnnouncements).map((date) => (react_1.default.createElement("div", { key: date },
                react_1.default.createElement("div", { className: " flex justify-center w-full mt-5 mb-2" },
                    react_1.default.createElement("div", { className: "text-center text-xs bg-neutral-700 px-2 py-1 rounded-full text-neutral-0" }, date)),
                groupedAnnouncements[date].map((message, index) => (react_1.default.createElement(messages_1.default, { key: index, message: message, user_id: user._id }))))))),
            react_1.default.createElement("div", { className: "sticky bottom-3 left-5 w-full flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 text-gunmetal" },
                react_1.default.createElement("textarea", { className: `rounded-xl text-base w-11/12
									bg-neutral-0 border-primary-400 shadow-lg
									focus:ring-primary-500 focus:border-primary-500`, style: { resize: "none" }, cols: 30, rows: rowCount, value: messageText, placeholder: "Enter: new line | Ctrl + Enter: send message", onChange: (e) => {
                        handleTextareaChange(e.target.value);
                    }, onKeyDown: (e) => handleKeyDown(e) }),
                react_1.default.createElement("div", { className: "absolute right-16  rounded-full p-2 text-md bg-primary-500 text-neutral-0\r\n\t\t\t\t\t\t\t\t\thover:bg-primary-700 hover:cursor-pointer", onClick: () => handleMessage() },
                    react_1.default.createElement(io5_1.IoSend, null))))));
}
exports.default = AdminAnnouncements;
