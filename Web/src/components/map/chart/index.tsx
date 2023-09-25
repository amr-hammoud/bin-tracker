import React from "react";
import * as d3 from "d3";
import { BinRecord } from "../../../store/interfaces";

interface ChartProps {
	data: Array<BinRecord>;
}


export default function LineChart(props: ChartProps) {
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

	const [minDate, maxDate] = d3.extent(timeData, (d) => d.time) as [Date, Date];

	const x = d3
		.scaleTime()
		.domain([minDate,maxDate])
		.range([marginLeft, width - marginRight]);

	const y = d3
		.scaleLinear()
		.domain([d3.min(timeData, (d) => d.value) || 0, d3.max(timeData, (d) => d.value) || 0])
		.range([height - marginBottom, marginTop]);

		console.log(y.ticks(5));
		


	const line = d3
		.line<[number, number]>()
		.x((d) => d[0])
		.y((d) => d[1]);

	const timeDataAsCoordinates: [number, number][] = timeData.map((d) => [
		x(d.time ? d.time : 0) || 0,
		y(d.value),
	]);

	const pathD = line(timeDataAsCoordinates);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(0, ${height - marginBottom})`}>
				<line
					x1={marginLeft}
					x2={width - marginRight}
					stroke="#000000"
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
							{d3.timeFormat("%m-%d")(tick)}
						</text>
					))}
				</g>
			</g>

			<g transform={`translate(${marginLeft}, 0)`}>
				<line
					y1={marginTop}
					y2={height - marginBottom}
					stroke="#000000"
				/>
				<g>
					{y.ticks(5).map((tick) => (
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

			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				d={pathD || undefined}
			/>

			<g fill="#3DA35D" stroke="#3DA35D" strokeWidth={1.5}>
				{timeData.map((d, i) => (
					<circle
						key={i}
						cx={x(d.time ? d.time : 0)}
						cy={y(d.value)}
						r="2.5"
						fill="3DA35D"
					/>
				))}
			</g>
		</svg>
	);
}
