"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const auth_1 = __importDefault(require("./pages/auth"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store/store"));
const dashboard_1 = __importDefault(require("./pages/superadmin/dashboard"));
const users_1 = __importDefault(require("./pages/superadmin/users"));
const groups_1 = __importDefault(require("./pages/superadmin/groups"));
const account_1 = __importDefault(require("./pages/superadmin/account"));
const dashboard_2 = __importDefault(require("./pages/admin/dashboard"));
const react_2 = require("redux-persist/integration/react");
const redux_persist_1 = require("redux-persist");
const bins_1 = __importDefault(require("./pages/admin/bins"));
const map_1 = __importDefault(require("./pages/admin/map"));
const users_2 = __importDefault(require("./pages/admin/users"));
const trucks_1 = __importDefault(require("./pages/admin/trucks"));
const announcements_1 = __importDefault(require("./pages/admin/announcements"));
const chats_1 = __importDefault(require("./pages/admin/chats"));
const account_2 = __importDefault(require("./pages/admin/account"));
const landing_1 = __importDefault(require("./pages/landing"));
const e401_1 = __importDefault(require("./pages/other/e401"));
const e404_1 = __importDefault(require("./pages/other/e404"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
function App() {
    const persistor = (0, redux_persist_1.persistStore)(store_1.default);
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(react_2.PersistGate, { loading: null, persistor: persistor },
            react_1.default.createElement("div", { className: " font-poppins cursor-default" },
                react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                    react_1.default.createElement(react_router_dom_1.Routes, null,
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(landing_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(auth_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/sadmin/dashboard", element: react_1.default.createElement(auth_middleware_1.default, { path: "/admin/dashboard", element: react_1.default.createElement(dashboard_1.default, null), roles: ["1"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/sadmin/users", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/users", element: react_1.default.createElement(users_1.default, null), roles: ["1"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/sadmin/groups", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/groups", element: react_1.default.createElement(groups_1.default, null), roles: ["1"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/sadmin/account", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(account_1.default, null), roles: ["1"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/dashboard", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(dashboard_2.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/bins", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(bins_1.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/map/:id?", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(map_1.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/users", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(users_2.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/trucks", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(trucks_1.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/announcements", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(announcements_1.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/chats", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(chats_1.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/account", element: react_1.default.createElement(auth_middleware_1.default, { path: "/sadmin/account", element: react_1.default.createElement(account_2.default, null), roles: ["2"] }) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/privacy-policy", element: "" }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/terms", element: "" }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/e401", element: react_1.default.createElement(e401_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(e404_1.default, null) })))))));
}
exports.default = App;
