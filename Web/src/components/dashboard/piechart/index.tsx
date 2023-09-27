import { ResponsivePie } from "@nivo/pie";
import React from "react";

const PieChart: React.FC<{ data: any }> = ({ data }) => {
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ResponsivePie
				data={data}
				margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				enableArcLinkLabels={false}
				borderColor={{
					from: "color",
					modifiers: [["darker", 0.2]],
				}}
				legends={[
					{
						anchor: "bottom",
						direction: "row",
						justify: false,
						translateX: 0,
						translateY: 56,
						itemsSpacing: 0,
						itemWidth: 100,
						itemHeight: 18,
						itemTextColor: "#999",
						itemDirection: "left-to-right",
						itemOpacity: 1,
						symbolSize: 18,
						symbolShape: "circle",
						effects: [
							{
								on: "hover",
								style: {
									itemTextColor: "#000",
								},
							},
						],
					},
				]}
			/>
		</div>
	);
};

export default PieChart;
