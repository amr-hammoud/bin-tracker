"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
function ProtectedRoute(props) {
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    let location = (0, react_router_dom_1.useLocation)();
    if (!token) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    else {
        if (props.roles &&
            props.roles.length > 0 &&
            user &&
            !props.roles.includes(user.user_type)) {
            return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/e401", state: { from: location }, replace: true });
        }
    }
    return react_1.default.createElement(react_1.default.Fragment, null, props.element);
}
exports.default = ProtectedRoute;
