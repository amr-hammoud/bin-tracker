import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ListItemProps {
	items: Array<string | null>;
	customIcon?: React.ReactNode;
	customIconAction?: () => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}



export default function ListItem(props: ListItemProps) {

	const AdditionalIcon = props.customIcon

	return (
		<div
			className="flex justify-between content-center shadow border border-primary-300 rounded-md px-3 py-4 my-3
                        hover:bg-primary-100"
		>
			<div className="flex flex-grow justify-between gap-3">
				{props.items.map((item, index) => {
					return (
						<div className="w-full px-3 truncate select-none" key={index}>
							<div>{item}</div>
						</div>
					);
				})}
			</div>
			<div className="flex gap-3">
				<div
					className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
					onClick={() => props.customIconAction? props.customIconAction() : ""}
				>
					{AdditionalIcon}
				</div>
				<div
					className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
				>
					<MdOutlineEdit />
				</div>
				<div
					className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
				>
					<RiDeleteBin6Line />
				</div>
			</div>
		</div>
	);
}