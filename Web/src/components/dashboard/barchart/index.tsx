import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart: React.FC<{ data: { date: string; count: number }[] }> = ({
	data,
}) => {
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ResponsiveBar
				data={data}
				keys={["count"]}
				indexBy="date"
				margin={{ top: 30, right: 25, bottom: 50, left: 60 }}
				padding={0.4}
				valueScale={{ type: "linear" }}
				colors="#3da35d"
				animate={true}
				enableLabel={false}
				axisTop={null}
				axisRight={null}
				axisLeft={{
					tickSize: 10,
					tickPadding: 5,
					tickRotation: 0,
					legend: "# of bins",
					legendPosition: "middle",
					legendOffset: -40,
				}}
				axisBottom={{
					format: (value) => {
						const date = new Date(value);
						const month = date.toLocaleString("default", {
							month: "short",
						});
						const day = date.getDate();
						return `${month} ${day}`;
					},
					legend: "Date",
					legendPosition: "middle",
					legendOffset: 32,
				}}
				tooltip={({ value }) => (
					<div className="p-2 bg-neutral-50 shadow-md rounded-lg border border-primary-500">
						Count: {value}
					</div>
				)}
			/>
		</div>
	);
};

export default BarChart;
