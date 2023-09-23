import React from "react";

interface SelectProps {
	label?: string;
	required?: boolean;
	value?: any;
	disabled?: boolean;
    options: Record<string, string | undefined>,
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: SelectProps) {

	return (
		<div className="flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 w-full text-gunmetal">
			<div className=" text-sm flex content-center gap-1 cursor-default select-none">
				<div className=" flex content-center flex-wrap">
					{props.label}
					{props.required ? (
						<span className=" text-red-500">*</span>
					) : (
						""
					)}
				</div>
			</div>
			<select
				className="font-poppins w-full bg-neutral-50 border-neutral-700 rounded text-base text-gunmetal
							hover:cursor-pointer focus:ring-primary-500 focus:border-primary-500"
				value={props.value}
				disabled={props.disabled}
				onChange={(e) => props.onChange(e)}
			>
                {Object.entries(props.options).map(([key, value], index) => {
                    return <option value={value} key={index}>{key}</option>
                })}
			</select>
		</div>
	);
}
