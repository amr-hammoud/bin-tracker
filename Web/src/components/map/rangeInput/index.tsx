import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderProps {
	values: Array<number>;
	setter: (value: number[]) => void;
}

const RangeSlider = (mainProps: RangeSliderProps) => {
	return (
		<div className="w-full px-3 mt-2">
			<Range
				step={1}
				min={0}
				max={100}
				values={mainProps.values}
				onChange={(newValues) => mainProps.setter(newValues)}
				renderTrack={({ props, children }) => (
					<div
						{...props}
						style={{
							...props.style,
							height: "10px",
							width: "100%",
							borderRadius: "12px",
							background: getTrackBackground({
								values: mainProps.values,
								colors: ["#bbbbbb", "#3da35d", "#bbbbbb"],
								min: 0,
								max: 100,
							}),
						}}
					>
                        
						{children}
					</div>
				)}
				renderThumb={({ index, props, isDragged }) => (
					<div
						{...props}
						draggable="true"
						style={{
							...props.style,
							height: "20px",
							width: "20px",
							borderRadius: "50%",
							backgroundColor:
								index === 0 ? "#3da35d" : "#3da35d",
						}}
					/>
				)}
			/>
			<div className="flex justify-between mt-3">
				<label>Min: {mainProps.values[0]}</label>
				<label>Max: {mainProps.values[1]}</label>
			</div>
		</div>
	);
};

export default RangeSlider;
