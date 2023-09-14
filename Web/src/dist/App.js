"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const auth_1 = __importDefault(require("./pages/auth"));
const users_1 = __importDefault(require("./pages/users"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store/store"));
function App() {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(auth_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/users", element: react_1.default.createElement(users_1.default, null) })))));
}
exports.default = App;
