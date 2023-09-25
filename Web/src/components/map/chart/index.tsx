import React from "react";
import * as d3 from "d3";
import { BinRecord } from "../../../store/interfaces";

interface ChartProps {
	data: Array<BinRecord>;
}

interface ParsedDataPoint {
	time: Date;
	value: number;
}

export default function LineChart(props: ChartProps) {
	const width = 640;
	const height = 150;
	const marginTop = 20;
	const marginRight = 20;
	const marginBottom = 20;
	const marginLeft = 40; // Increased margin to accommodate x-axis labels

	// Parse updatedAt as timestamps
	const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

	const timeData = props.data.map((d) => ({
		time: parseTime(d.updatedAt),
		value: parseInt(d.record),
	}));

	// Create scales for time and value
	const x = d3
		.scaleTime()
		.domain(d3.extent(timeData, (d) => d.time) as [Date, Date])
		.range([marginLeft, width - marginRight]);

	const y = d3
		.scaleLinear()
		.domain([0, d3.max(timeData, (d) => d.value) || 0])
		.range([height - marginBottom, marginTop]);

	// Create a line generator for the line chart
	const line = d3
		.line<[number, number]>()
		.x((d) => x(d[0]))
		.y((d) => y(d[1]));

	const timeDataAsCoordinates: [number, number][] = timeData.map((d) => [
		x(d.time ? d.time : 0) || 0, // Convert Date to number (use 0 if there's an issue)
		y(d.value),
	]);

	// Generate the path data
	const pathD = line(timeDataAsCoordinates);

	return (
		<svg width={width} height={height}>
			{/* Draw x-axis */}
			<g transform={`translate(0, ${height - marginBottom})`}>
				<line
					x1={marginLeft}
					x2={width - marginRight}
					stroke="currentColor"
				/>
				<g>
					{x.ticks().map((tick) => (
						<text
							key={tick.toString()}
							x={x(tick)}
							y={20}
							textAnchor="middle"
							fill="currentColor"
						>
							{d3.timeFormat("%Y-%m-%d")(tick)}
						</text>
					))}
				</g>
			</g>

			{/* Draw y-axis */}
			<g transform={`translate(${marginLeft}, 0)`}>
				<line
					y1={marginTop}
					y2={height - marginBottom}
					stroke="currentColor"
				/>
				<g>
					{y.ticks().map((tick) => (
						<text
							key={tick.toString()}
							x={-10}
							y={y(tick)}
							dy="0.32em"
							textAnchor="end"
							fill="currentColor"
						>
							{tick}
						</text>
					))}
				</g>
			</g>

			{/* Draw the line */}
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				d={pathD || undefined}
			/>

			{/* Draw data points */}
			<g fill="currentColor" stroke="currentColor" strokeWidth={1.5}>
				{timeData.map((d, i) => (
					<circle
						key={i}
						cx={x(d.time ? d.time : 0)}
						cy={y(d.value)}
						r="2.5"
						fill="currentColor"
					/>
				))}
			</g>
		</svg>
	);
}
