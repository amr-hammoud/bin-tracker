import React from "react";

interface ListItemProps {
	items: Array<string | null>;
}



export default function ListHeader(props: ListItemProps) {
	
	const newArray = props.items.slice(0,props.items.length - 1)
	
	return (
		<div
			className="flex justify-between content-center shadow border border-primary-300 rounded-md px-3 py-4 my-3
                        hover:bg-primary-100 bg-primary-100 font-bold"
		>
			<div className="flex flex-grow justify-between gap-3">
				{newArray.map((item, index) => {
					return (
						<div className="w-full px-3 truncate select-none" key={index}>
							<div>{item}</div>
						</div>
					);
				})}
			</div>
			<div className="flex gap-3">
				<div>{props.items[props.items.length-1]}</div>
			</div>
		</div>
	);
}
