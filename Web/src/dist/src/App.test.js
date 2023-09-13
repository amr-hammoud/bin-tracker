"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const App_1 = __importDefault(require("./App"));
const react_2 = __importDefault(require("react"));
test('renders learn react link', () => {
    (0, react_1.render)(react_2.default.createElement(App_1.default, null));
    const linkElement = react_1.screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
