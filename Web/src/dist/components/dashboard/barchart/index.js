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
const react_1 = __importStar(require("react"));
const d3 = __importStar(require("d3"));
const DashboardBarChart = ({ data }) => {
    const chartRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!chartRef.current)
            return;
        const width = chartRef.current.clientWidth;
        const height = chartRef.current.clientHeight;
        console.log(chartRef.current.clientHeight);
        const margin = {
            top: 30,
            right: 20,
            bottom: 40,
            left: 40,
        };
        const svg = d3.select(chartRef.current);
        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
        const formatDate = d3.timeFormat("%b %d");
        data.forEach((d) => {
            d.date = formatDate(parseDate(d.date));
        });
        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.date))
            .range([0, width - margin.left - margin.right])
            .padding(0.1);
        const maxCount = d3.max(data, (d) => d.count);
        const yScale = d3
            .scaleLinear()
            .domain([0, Math.ceil(maxCount)])
            .nice()
            .range([height - margin.top - margin.bottom, 0]);
        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.date) || 0)
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - margin.top - margin.bottom - yScale(d.count))
            .attr("fill", "steelblue");
        g.selectAll(".bar-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", (d) => (xScale(d.date) || 0) + xScale.bandwidth() / 2)
            .attr("y", (d) => yScale(d.count) - 10)
            .attr("text-anchor", "middle")
            .text((d) => d.count);
        g.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(xScale));
        g.append("g").call(d3.axisLeft(yScale));
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", margin.left - 50)
            .attr("dy", "1.5em")
            .attr("text-anchor", "middle")
            .text("# of bins");
        return () => {
            svg.selectAll("*").remove();
        };
    }, [data]);
    return react_1.default.createElement("svg", { ref: chartRef });
};
exports.default = DashboardBarChart;
