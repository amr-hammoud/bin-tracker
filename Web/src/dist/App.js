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
const dashboard_1 = __importDefault(require("./pages/superadmin/dashboard"));
const users_2 = __importDefault(require("./pages/superadmin/users"));
const groups_1 = __importDefault(require("./pages/superadmin/groups"));
const account_1 = __importDefault(require("./pages/superadmin/account"));
const dashboard_2 = __importDefault(require("./pages/admin/dashboard"));
const react_2 = require("redux-persist/integration/react");
const redux_persist_1 = require("redux-persist");
function App() {
    const persistor = (0, redux_persist_1.persistStore)(store_1.default);
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(react_2.PersistGate, { loading: null, persistor: persistor },
            react_1.default.createElement("div", { className: " font-poppins cursor-default" },
                react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                    react_1.default.createElement(react_router_dom_1.Routes, null,
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(auth_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/users", element: react_1.default.createElement(users_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/dashboard", element: react_1.default.createElement(dashboard_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/users", element: react_1.default.createElement(users_2.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/groups", element: react_1.default.createElement(groups_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/account", element: react_1.default.createElement(account_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(dashboard_2.default, null) })))))));
}
exports.default = App;
