import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ListItemProps {
	items: Array<string | undefined>;
	customIcon?: React.ReactNode;
	customIconAction?: () => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export default function ListItem(props: ListItemProps) {
	const AdditionalIcon = props.customIcon;

	return (
		<div
			className="flex justify-between content-center shadow border border-primary-300 rounded-md px-3 py-4 my-3
                        hover:bg-primary-100"
		>
			<div className="flex flex-grow justify-between gap-3">
				{props.items.map((item, index) => {
					return (
						<div
							className="w-full px-3 truncate"
							key={index}
						>
							<div>{item ? item : "-"}</div>
						</div>
					);
				})}
			</div>
			<div className="flex gap-3">
				<div
					className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
					onClick={() =>
						props.customIconAction ? props.customIconAction() : ""
					}
				>
					{AdditionalIcon}
				</div>
				{props.onEdit ? (
					<div
						className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
					>
						<MdOutlineEdit />
					</div>
				) : (
					""
				)}
				{props.onDelete ? (
					<div
						className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
						id={props.items ? props.items[0] : ""}
						onClick={(e) =>
							props.onDelete
								? props.onDelete(e.currentTarget.id)
								: ""
						}
					>
						<RiDeleteBin6Line />
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}
