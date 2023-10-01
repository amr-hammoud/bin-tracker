import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Generic } from "../../../store/interfaces";

interface ListItemProps {
	items: Array<string | undefined | null>;
	object?: Object;
	customIcon?: React.ReactNode;
	customIcon_2?: React.ReactNode;
	customIconAction?: (object: any) => void;
	customIconAction_2?: (object: any) => void;
	onEdit?: (data: any) => void;
	onDelete?: (id: string) => void;
}

export default function ListItem(props: ListItemProps) {

	const object = props.object as Generic

	return (
		<div
			className="flex justify-between content-center shadow border border-primary-100 rounded-md px-3 py-4 my-2
                        hover:bg-primary-100"
		>
			<div className="flex flex-grow justify-between gap-3">
				{props.items.map((item, index) => {
					return (
						<div className="w-full px-3 truncate" key={index}>
							<div>
								{item ? item : "-"}
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex gap-3">
				<div
					className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
					onClick={() =>
						props.customIconAction_2 ? props.customIconAction_2(object) : ""
					}
				>
					{props.customIcon_2}
				</div>
				<div
					className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
					onClick={() =>
						props.customIconAction ? props.customIconAction(object) : ""
					}
				>
					{props.customIcon}
				</div>
				{props.onEdit ? (
					<div
						className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
						data-custom={JSON.stringify(props.object? props.object : "")}
						onClick={(e) =>
							props.onEdit ? props.onEdit(e.currentTarget.getAttribute("data-custom")) : ""
						}
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
						onClick={(e) =>
							props.onDelete
								? props.onDelete(object._id)
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
