import React from "react";

interface InputProps {
	type?: string;
	label?: string;
	name?: string;
	icon?: React.ReactNode;
	placeholder?: string;
	error?: string;
	required?: boolean;
	inputHeight?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
	return (
		<div className="flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 text-gunmetal">
			<div className=" text-sm flex content-center gap-1">
				<div className=" flex content-center flex-wrap text-primary-500">{props.icon}</div>
				<div className=" flex content-center flex-wrap">{props.label}{props.required ? <span className=" text-red-500">*</span> : ""}</div>
			</div>
			<input
				type={props.type || "text"}
				name={props.name}
				className={`peer/${props.name} rounded w-full text-base
                        bg-neutral-50 border-neutral-700
						placeholder:text-neutral-700 placeholder:text-base
                        focus:ring-primary-500 focus:border-primary-500
                        focus:invalid:border-red-500 focus:invalid:ring-red-500  ${props.inputHeight ? props.inputHeight : " h-11" }`}
				placeholder={props.placeholder}
				onChange={(e) => props.onChange && props.onChange(e)}
			/>
			<div className={`mt-2 text-red-600 text-sm`}>
				{props.error}
			</div>
		</div>
	);
}
