import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DashboardBarChart: React.FC<{
	data: { date: string; count: number }[];
}> = ({ data }) => {
	const chartRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!chartRef.current) return;

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
			d.date = formatDate(parseDate(d.date) as Date);
		});

		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.date))
			.range([0, width - margin.left - margin.right])
			.padding(0.1);

		const maxCount = d3.max(data, (d) => d.count) as number;
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
			.attr(
				"height",
				(d) => height - margin.top - margin.bottom - yScale(d.count)
			)
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
			.attr(
				"transform",
				`translate(0, ${height - margin.top - margin.bottom})`
			)
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

	return <svg ref={chartRef} />;
};

export default DashboardBarChart;
