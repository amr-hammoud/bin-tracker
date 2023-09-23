import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ListItemProps {
	data: Record<string, string | undefined>;
	customIcon?: React.ReactNode;
	customIconAction?: () => void;
	onEdit?: (data: any) => void;
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
				{Object.entries(props.data).map(([key, value], index) => {
					return (
						<div className="w-full px-3 truncate" key={index}>
							<div>
								{value ? value : "-"}
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
						props.customIconAction ? props.customIconAction() : ""
					}
				>
					{AdditionalIcon}
				</div>
				{props.onEdit ? (
					<div
						className="flex flex-wrap justify-between content-center opacity-70
                                hover:cursor-pointer hover:opacity-100"
						data-custom={JSON.stringify(props.data)}
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
						id={props.data ? props.data._id : ""}
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
