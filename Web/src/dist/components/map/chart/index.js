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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const d3 = __importStar(require("d3"));
function LineChart(props) {
    const width = 640;
    const height = 150;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 40;
    const timeData = props.data.map((d) => ({
        time: new Date(d.updatedAt),
        value: parseInt(d.record),
    }));
    const [minDate, maxDate] = d3.extent(timeData, (d) => d.time);
    const x = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([marginLeft, width - marginRight]);
    const y = d3
        .scaleLinear()
        .domain([d3.min(timeData, (d) => d.value) || 0, d3.max(timeData, (d) => d.value) || 0])
        .range([height - marginBottom, marginTop]);
    console.log(y.ticks(5));
    const line = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1]);
    const timeDataAsCoordinates = timeData.map((d) => [
        x(d.time ? d.time : 0) || 0,
        y(d.value),
    ]);
    const pathD = line(timeDataAsCoordinates);
    return (react_1.default.createElement("svg", { width: width, height: height },
        react_1.default.createElement("g", { transform: `translate(0, ${height - marginBottom})` },
            react_1.default.createElement("line", { x1: marginLeft, x2: width - marginRight, stroke: "#000000" }),
            react_1.default.createElement("g", null, x.ticks().map((tick) => (react_1.default.createElement("text", { key: tick.toString(), x: x(tick), y: 20, textAnchor: "middle", fill: "currentColor" }, d3.timeFormat("%m-%d")(tick)))))),
        react_1.default.createElement("g", { transform: `translate(${marginLeft}, 0)` },
            react_1.default.createElement("line", { y1: marginTop, y2: height - marginBottom, stroke: "#000000" }),
            react_1.default.createElement("g", null, y.ticks(5).map((tick) => (react_1.default.createElement("text", { key: tick.toString(), x: -10, y: y(tick), dy: "0.32em", textAnchor: "end", fill: "currentColor" }, tick))))),
        react_1.default.createElement("path", { fill: "none", stroke: "currentColor", strokeWidth: 1.5, d: pathD || undefined }),
        react_1.default.createElement("g", { fill: "#3DA35D", stroke: "#3DA35D", strokeWidth: 1.5 }, timeData.map((d, i) => (react_1.default.createElement("circle", { key: i, cx: x(d.time ? d.time : 0), cy: y(d.value), r: "2.5", fill: "3DA35D" }))))));
}
exports.default = LineChart;
