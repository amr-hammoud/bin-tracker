import React from "react";
import { IconType } from "react-icons/lib";
import {
	MdOutlineAccountCircle,
	MdOutlineCampaign,
	MdOutlineChat,
	MdOutlineGroups2,
	MdOutlineLocalShipping,
	MdOutlineMap,
	MdOutlineSpaceDashboard,
	MdPersonOutline,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface SidebarItemProps {
	label: string;
	selected: boolean;
	onSelected: (label: string) => void;
}

const iconMap: { [key: string]: IconType } = {
	Account: MdOutlineAccountCircle,
	Announcements: MdOutlineCampaign,
	Bins: RiDeleteBin6Line,
	Chats: MdOutlineChat,
	Dashboard: MdOutlineSpaceDashboard,
	Groups: MdOutlineGroups2,
	Map: MdOutlineMap,
	Trucks: MdOutlineLocalShipping,
	Users: MdPersonOutline,
};

export default function SidebarItem(props: SidebarItemProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const base_location = location.pathname.split("/")[1];

	const Icon = iconMap[props.label] || "";

	const clickHandler = (): void => {
		props.onSelected(props.label);
		navigate(
			base_location === "admin"
				? `/${base_location}/${props.label.toLowerCase()}`
				: `/${props.label.toLowerCase()}`, { replace: true}
		);
	};

	return (
		<div
			className={
				props.selected
					? `flex flex-wrap content-center font-poppins
						my-2 gap-3 w-full p-2 rounded-xl font-medium shadow-md
						text-neutral-0 bg-primary-500 hover:cursor-pointer`
					: `flex flex-wrap content-center font-poppins
						my-2 gap-3 w-full p-2 rounded-xl font-medium text-gunmetal
						hover:bg-primary-200 hover:cursor-pointer`
			}
			onClick={() => clickHandler()}
		>
			<div className=" flex content-center flex-wrap text-lg">
				{Icon ? <Icon /> : ""}
			</div>
			<div className=" flex content-center flex-wrap">{props.label}</div>
		</div>
	);
}
