import React from "react";

interface ButtonProps {
	type?: "button" | "submit" | "reset" | undefined;
	label: string;
	name?: string;
	color?: string;
	bgColor?: string;
	hoverColor?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export default function Button(props: ButtonProps) {

	return (
		<div className="flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-3 text-gunmetal">
			<button
				type={props.type || "button"}
				name={props.name}
				disabled={props.disabled}
				className={`peer/${props.name} rounded h-10 w-full px-5 text-base
				${props.bgColor ? props.bgColor : "bg-primary-500"} ${props.color ? props.color : "text-neutral-0"}
				font-medium ${props.hoverColor ? props.hoverColor : "hover:bg-primary-700"}
				disabled:bg-primary-300`}
				onClick={props.onClick}
			>
				{props.label}
			</button>
		</div>
	);
}
