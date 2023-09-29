import React, { useRef } from "react";
import { MdOutlineEdit } from "react-icons/md";

interface InputProps {
	type?: string;
	label?: string;
	name?: string;
	icon?: React.ReactNode;
	placeholder?: string;
	error?: string;
	required?: boolean;
	inputHeight?: string;
	value?: any;
	disabled?: boolean;
	enabler: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditArea(props: InputProps) {
	const input = useRef<HTMLInputElement>(null);

	return (
		<div className="flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 w-full text-gunmetal">
			<div className=" text-sm flex content-center gap-1 cursor-default select-none">
				<div className=" flex content-center flex-wrap text-primary-500">
					{props.icon}
				</div>
				<div className=" flex content-center flex-wrap">
					{props.label}
					{props.required ? (
						<span className=" text-red-500">*</span>
					) : (
						""
					)}
				</div>
			</div>
			<div className="relative h-fit w-full">
				<input
					type={props.type || "text"}
					name={props.name}
					className={`peer/${props.name} rounded w-full text-base
                        bg-neutral-50 border-neutral-700
						placeholder:text-neutral-700 placeholder:text-base
                        disabled:text-neutral-700
                        focus:ring-primary-500 focus:border-primary-500
                        focus:invalid:border-red-500 focus:invalid:ring-red-500  ${
							props.inputHeight ? props.inputHeight : " h-11"
						}`}
					ref={input}
					disabled={props.disabled}
					placeholder={props.placeholder}
					value={props.value ? props.value : null}
					onChange={(e) => props.onChange && props.onChange(e)}
				/>
				<div
					className="absolute bottom-4 right-4 opacity-70
								hover:cursor-pointer hover:opacity-100"
					onClick={async () => {
						await props.enabler();
						input.current ? input.current.focus() : console.log("");
					}}
				>
					<MdOutlineEdit />
				</div>
			</div>
			{props.error ? (
				<div className={`mt-2 text-red-600 text-sm`}>{props.error}</div>
			) : (
				""
			)}
		</div>
	);
}
