import React from "react";

interface ButtonProps {
	type?: "button" | "submit" | "reset" | undefined;
	label?: string;
	name?: string;
	onClick?: () => void;
}

export default function Button(props: ButtonProps) {
	return (
		<div className="flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-3 text-gunmetal">
			<button
				type={props.type || "button"}
				name={props.name}
				className={`peer/${props.name} rounded h-10 w-full text-base
                        bg-primary-500 text-neutral-0 font-medium
                        hover:bg-primary-600`}
				onClick={props.onClick}
			>
				{props.label}
			</button>
		</div>
	);
}
