import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { BinRecord } from "../../../store/interfaces";

const LineChart: React.FC<{ data: any }> = ({ data }) => {
	const formattedRecords = data.map((record: BinRecord) => {
		return {
			x: record.updatedAt,
			y: record.record,
		};
	});

	const formattedData = {
		id: "bin",
		color: "#3da35d",
		data: [...formattedRecords],
	};
	console.log([formattedData]);

	const formatDate = (value: string, format: string) => {
		const date = new Date(value);
		const month = date.toLocaleString("default", {
			month: "short",
		});
		const day = date.getDate();
		if(format === "DM") {
			return `${month} ${day}`
		} else if(format === "D") {
			return `${day}`
		}
		return `X`;
	};

	const getTooltip = (tooltipProps: any) => {
		const { point } = tooltipProps;
		if (point) {
			return (
				<div className="p-2 bg-neutral-50 shadow-md rounded-lg border border-primary-500">
					<strong>Date:</strong> {formatDate(point.data.xFormatted, "DM")}
					<br />
					<strong>Fill:</strong> {point.data.yFormatted}%
				</div>
			);
		}
		return null;
	};

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ResponsiveLine
				data={[formattedData]}
				margin={{ top: 5, right: 30, bottom: 50, left: 50 }}
				xScale={{ type: "point" }}
				yScale={{
					type: "linear",
					min: 0,
					max: 100,
					stacked: true,
					reverse: false,
				}}
				curve="linear"
				colors="#3da35d"
				enableGridX={false}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					format: (value) => formatDate(value, "D"),
					legend: "date",
					legendOffset: 36,
					legendPosition: "middle",
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "fill (%)",
					legendOffset: -40,
					legendPosition: "middle",
				}}
				pointSize={5}
				pointColor="#2d3a3a"
				pointBorderWidth={2}
				pointBorderColor="#2d3a3a"
				pointLabelYOffset={-12}
				useMesh={true}
				enableCrosshair={false}
				tooltip={getTooltip}
			/>
		</div>
	);
};

export default LineChart;
