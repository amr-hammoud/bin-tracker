"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_range_1 = require("react-range");
const RangeSlider = (mainProps) => {
    return (react_1.default.createElement("div", { className: "w-full px-3 mt-2" },
        react_1.default.createElement(react_range_1.Range, { step: 1, min: 0, max: 100, values: mainProps.values, onChange: (newValues) => mainProps.setter(newValues), renderTrack: ({ props, children }) => (react_1.default.createElement("div", Object.assign({}, props, { style: Object.assign(Object.assign({}, props.style), { height: "10px", width: "100%", borderRadius: "12px", background: (0, react_range_1.getTrackBackground)({
                        values: mainProps.values,
                        colors: ["#bbbbbb", "#3da35d", "#bbbbbb"],
                        min: 0,
                        max: 100,
                    }) }) }), children)), renderThumb: ({ index, props, isDragged }) => (react_1.default.createElement("div", Object.assign({}, props, { draggable: "true", style: Object.assign(Object.assign({}, props.style), { height: "20px", width: "20px", borderRadius: "50%", backgroundColor: index === 0 ? "#3da35d" : "#3da35d" }) }))) }),
        react_1.default.createElement("div", { className: "flex justify-between mt-3" },
            react_1.default.createElement("label", null,
                "Min: ",
                mainProps.values[0]),
            react_1.default.createElement("label", null,
                "Max: ",
                mainProps.values[1]))));
};
exports.default = RangeSlider;
