"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_modal_1 = __importDefault(require("react-modal"));
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        height: "fit-content",
        width: "fit-content",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.7)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60
    },
};
const ModalComponent = ({ showModal, onRequestClose, children, }) => {
    return (react_1.default.createElement(react_modal_1.default, { isOpen: showModal, shouldCloseOnOverlayClick: true, onRequestClose: onRequestClose, style: customStyles, contentLabel: "Modal", appElement: document.getElementById("root") || undefined }, children));
};
exports.default = ModalComponent;
