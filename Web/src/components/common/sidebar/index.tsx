import React, { useState } from "react";
import SidebarItem from "../../base/sidebarItem";
import logo from "../../../assets/logo/Logo-full.svg";
import { BiLogOut } from "react-icons/bi";

interface SidebarProps {
	items: Array<string>;
	selected: string;
}

export default function Sidebar(props: SidebarProps) {
	const [selectedTab, setSelectedTab] = useState(props.selected);

	const selectHandler = (label: string) => {
		setSelectedTab(label);
	};

	return (
		<div className="flex flex-col flex-wrap shadow-md  h-screen w-56 p-4">
			<div className="w-full flex justify-center">
				<img src={logo} className="w-32" alt="logo" />
			</div>
			<div className=" mt-8">
				{props.items?.map((item, index) => {
					return (
						<SidebarItem
							key={index}
							label={item}
							selected={selectedTab === item}
							onSelected={(label) => selectHandler(label)}
						/>
					);
				})}
			</div>
			<div
				className="flex flex-wrap content-center font-poppins
				mt-12 gap-3 w-full p-2 rounded-xl font-medium text-gunmetal
				hover:bg-red-200 hover:cursor-pointer"
				// onClick={() => handleLogout()}
				// ref={logoutButton}
			>
				<div className=" flex content-center flex-wrap">
					<BiLogOut />
				</div>
				<div className=" flex content-center flex-wrap">Logout</div>
			</div>
		</div>
	);
}