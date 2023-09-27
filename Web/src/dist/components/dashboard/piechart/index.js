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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChart = void 0;
const react_1 = __importStar(require("react"));
const d3 = __importStar(require("d3"));
const PieChart = ({ data }) => {
    const chartRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!chartRef.current)
            return;
        const width = chartRef.current.clientWidth;
        const height = chartRef.current.clientHeight;
        const pie = d3
            .pie()
            .value((d) => d.value);
        const arc = d3
            .arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1);
        const colorScale = d3
            .scaleOrdinal()
            .domain(data.map((d) => d.name))
            .range(d3.schemeCategory10);
        const svg = d3.select(chartRef.current);
        const g = svg
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);
        const arcs = pie(data);
        const path = g
            .selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => colorScale(d.data.name));
        g.selectAll("text")
            .data(arcs)
            .enter()
            .append("text")
            .attr("transform", (d) => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text((d) => d.data.value);
        return () => {
            svg.selectAll("*").remove();
        };
    }, [data]);
    return react_1.default.createElement("svg", { ref: chartRef });
};
exports.PieChart = PieChart;
