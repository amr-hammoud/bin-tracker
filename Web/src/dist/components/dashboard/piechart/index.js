"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pie_1 = require("@nivo/pie");
const react_1 = __importDefault(require("react"));
const PieChart = ({ data }) => {
    return (react_1.default.createElement("div", { style: { height: "100%", width: "100%" } },
        react_1.default.createElement(pie_1.ResponsivePie, { data: data, margin: { top: 40, right: 80, bottom: 80, left: 80 }, innerRadius: 0.5, padAngle: 0.7, cornerRadius: 3, activeOuterRadiusOffset: 8, borderWidth: 1, enableArcLinkLabels: false, borderColor: {
                from: "color",
                modifiers: [["darker", 0.2]],
            }, legends: [
                {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                },
            ] })));
};
exports.default = PieChart;
