import React from "react";

interface NavbarProps {
	label?: string;
    buttonLabel?: string;
    buttonAction?: () => void;
}

export default function Navbar(props: NavbarProps) {
	return (
		<div className="flex justify-between px-5 py-3 font-semibold text-2xl text-neutral-0 bg-primary-500 w-full select-none">
			{props.label}
            {props.buttonAction ? 
			<div className="flex flex-wrap justify-center content-center py-1 px-2
                            rounded text-base shadow-md bg-neutral-0 text-primary-500"
                    onClick={() => props.buttonAction ? props.buttonAction() : ""}>
				{props.buttonLabel}
			</div> : ""}
		</div>
	);
}
