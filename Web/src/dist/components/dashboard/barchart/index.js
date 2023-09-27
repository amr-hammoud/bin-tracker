"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const bar_1 = require("@nivo/bar");
const BarChart = ({ data, }) => {
    return (react_1.default.createElement("div", { style: { height: "100%", width: "100%" } },
        react_1.default.createElement(bar_1.ResponsiveBar, { data: data, keys: ["count"], indexBy: "date", margin: { top: 30, right: 25, bottom: 50, left: 60 }, padding: 0.4, valueScale: { type: "linear" }, colors: "#3da35d", animate: true, enableLabel: false, axisTop: null, axisRight: null, axisLeft: {
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: "# of bins",
                legendPosition: "middle",
                legendOffset: -40,
            }, axisBottom: {
                format: (value) => {
                    const date = new Date(value);
                    const month = date.toLocaleString("default", {
                        month: "short",
                    });
                    const day = date.getDate();
                    return `${month} ${day}`;
                },
                legend: "Date",
                legendPosition: "middle",
                legendOffset: 32,
            } })));
};
exports.default = BarChart;
