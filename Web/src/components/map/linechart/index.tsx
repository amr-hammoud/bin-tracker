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
				curve="natural"
				colors="#3da35d"
				enableGridX={false}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					format: (value) => {
						const date = new Date(value);
						const month = date.toLocaleString("default", {
							month: "short",
						});
						const day = date.getDate();
						return `${month} ${day}`;
					},
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
			/>
		</div>
	);
};

export default LineChart;
