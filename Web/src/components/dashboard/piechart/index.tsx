import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { PieArcDatum } from "d3";

export const PieChart: React.FC<{
	data: { name: string; value: number }[];
}> = ({ data }) => {
	const chartRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		const width = chartRef.current.clientWidth;
		const height = chartRef.current.clientHeight;

		const pie = d3
			.pie<{ name: string; value: number }>()
			.value((d) => d.value);

		const arc = d3
			.arc<PieArcDatum<{ name: string; value: number }>>()
			.innerRadius(0)
			.outerRadius(Math.min(width, height) / 2 - 1);

		const colorScale = d3
			.scaleOrdinal<string>()
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

	return <svg ref={chartRef} />;
};
