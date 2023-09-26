import React, { useState } from "react";
import SidebarItem from "../../base/sidebarItem";
import logo from "../../../assets/logo/Logo-full.svg";
import logoCollapsed from "../../../assets/logo/Logo-collapse.svg";
import { LuMenu } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { setCollapse } from "../../../store/sidebarSlice";

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

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
	);
	

	return (
		<div className="flex flex-col flex-wrap fixed shadow-md bg-neutral-50 h-screen w-fit p-4 z-50 select-none">
			<div
				className="flex justify-center w-fill mt-2 mb-8 text-xl rounded-md p-2
							hover:bg-primary-400 hover:text-neutral-0 hover:cursor-pointer"
				onClick={() => dispatch(setCollapse(!collapse))}
			>
				<LuMenu />
			</div>
			<div className="w-full flex justify-center">
				{collapse ? (
					<img src={logoCollapsed} className=" w-2/3" alt="logo" />
				) : (
					<img src={logo} className="w-32" alt="logo" />
				)}
			</div>
			<div
				className={`mt-8 ${
					collapse ? "flex flex-col flex-wrap justify-center content-center" : ""
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
				className={`flex flex-wrap content-center ${collapse ? "justify-center w-full" : ""}  font-poppins
				mt-12 gap-3 p-2 rounded-xl font-medium text-gunmetal
				hover:bg-red-200 hover:cursor-pointer`}
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
