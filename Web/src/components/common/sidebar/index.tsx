import React, { useState } from "react";
import SidebarItem from "../../base/sidebarItem";
import logo from "../../../assets/logo/Logo-full.svg";
import logoCollapsed from "../../../assets/logo/Logo-collapse.svg";
import { LuMenu } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
	items: Array<string>;
	selected: string;
}

export default function Sidebar(props: SidebarProps) {
	const [selectedTab, setSelectedTab] = useState(props.selected);

	const selectHandler = (label: string) => {
		setSelectedTab(label);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = (): void => {
		dispatch(setToken(null));
		dispatch(setUser(null));
		navigate("/", { replace: true });
	};

	const [collapse, setCollapse] = useState<boolean>(true);

	return (
		<div className="flex flex-col flex-wrap shadow-md bg-neutral-50 h-screen w-fit p-4">
			<div
				className="flex justify-center w-fill mt-2 mb-8 text-xl rounded-md p-2
							hover:bg-primary-400 hover:text-neutral-0 hover:cursor-pointer"
				onClick={() => setCollapse(!collapse)}
			>
				<LuMenu />
			</div>
			<div className="w-full flex justify-center">
				{collapse ? (
					<img src={logoCollapsed} className=" w-3/4" alt="logo" />
				) : (
					<img src={logo} className="w-32" alt="logo" />
				)}
			</div>
			<div
				className={`mt-8 ${
					collapse ? "flex flex-col justify-center" : ""
				}`}
			>
				{props.items?.map((item, index) => {
					return (
						<SidebarItem
							key={index}
							collapse={collapse}
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
				onClick={() => handleLogout()}
			>
				<div className=" flex content-center flex-wrap">
					<BiLogOut />
				</div>
				{collapse ? (
					""
				) : (
					<div className=" flex content-center flex-wrap">Logout</div>
				)}
			</div>
		</div>
	);
}
